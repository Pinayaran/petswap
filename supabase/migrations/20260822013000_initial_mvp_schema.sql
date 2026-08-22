create extension if not exists btree_gist with schema extensions;
create extension if not exists pgcrypto with schema extensions;

create type public.listing_status as enum ('draft', 'published', 'deleted');
create type public.booking_status as enum ('pending', 'confirmed', 'declined', 'cancelled', 'completed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(trim(display_name)) > 0),
  photo_url text,
  phone_number text,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  species text not null check (length(trim(species)) > 0),
  breed text,
  age_years integer check (age_years is null or age_years >= 0),
  photo_url text,
  description text,
  feeding_instructions text,
  medical_notes text,
  behavior_notes text,
  allergies text,
  vaccination_info text,
  special_requirements text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (length(trim(title)) > 0),
  location text not null check (length(trim(location)) > 0),
  description text not null check (length(trim(description)) > 0),
  capacity integer not null check (capacity > 0),
  accepted_pet_types text[] not null default '{}',
  facilities text,
  status public.listing_status not null default 'draft',
  deleted_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint listings_deleted_state_check check (
    (status = 'deleted' and deleted_at is not null)
    or (status <> 'deleted' and deleted_at is null)
  )
);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (listing_id, storage_path)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  pet_id uuid not null references public.pets(id) on delete restrict,
  requester_id uuid not null references public.profiles(id) on delete cascade,
  status public.booking_status not null default 'pending',
  start_date date not null,
  end_date date not null,
  requester_note text,
  owner_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmed_at timestamptz,
  declined_at timestamptz,
  cancelled_at timestamptz,
  completed_at timestamptz,
  constraint bookings_valid_window_check check (start_date < end_date),
  constraint bookings_no_confirmed_overlap exclude using gist (
    listing_id with =,
    daterange(start_date, end_date, '[)') with &&
  ) where (status = 'confirmed')
);

create index pets_owner_id_idx on public.pets(owner_id);
create index listings_owner_id_idx on public.listings(owner_id);
create index listings_public_search_idx on public.listings(status, deleted_at, location);
create index listing_images_listing_id_idx on public.listing_images(listing_id);
create index bookings_requester_id_idx on public.bookings(requester_id);
create index bookings_listing_id_idx on public.bookings(listing_id);
create index bookings_pet_id_idx on public.bookings(pet_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_pets_updated_at
before update on public.pets
for each row execute function public.set_updated_at();

create trigger set_listings_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

create trigger set_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1), 'PetSwap user'))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger create_profile_on_auth_user_insert
after insert on auth.users
for each row execute function public.create_profile_for_auth_user();

create or replace function public.current_user_owns_listing(target_listing_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.listings
    where id = target_listing_id
      and owner_id = auth.uid()
  );
$$;

create or replace function public.listing_is_public(target_listing_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.listings
    where id = target_listing_id
      and status = 'published'
      and deleted_at is null
  );
$$;

create or replace function public.storage_folder_listing_id(object_name text)
returns uuid
language plpgsql
immutable
as $$
begin
  return split_part(object_name, '/', 1)::uuid;
exception
  when invalid_text_representation then
    return null;
end;
$$;

create or replace function public.guard_booking_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  listing_owner uuid;
begin
  select owner_id into listing_owner
  from public.listings
  where id = coalesce(new.listing_id, old.listing_id);

  if tg_op = 'INSERT' then
    if actor is null or new.requester_id <> actor then
      raise exception 'booking requester must be the authenticated user';
    end if;

    if not exists (
      select 1 from public.pets
      where id = new.pet_id and owner_id = actor
    ) then
      raise exception 'booking pet must belong to requester';
    end if;

    if listing_owner is null or listing_owner = actor then
      raise exception 'requester cannot book their own or missing listing';
    end if;

    if not public.listing_is_public(new.listing_id) then
      raise exception 'booking listing must be published';
    end if;

    if new.status <> 'pending' then
      raise exception 'new bookings must start pending';
    end if;

    return new;
  end if;

  if new.listing_id <> old.listing_id
    or new.pet_id <> old.pet_id
    or new.requester_id <> old.requester_id
    or new.start_date <> old.start_date
    or new.end_date <> old.end_date then
    raise exception 'booking ownership, pet, listing, and dates are immutable after request';
  end if;

  if old.status = new.status then
    return new;
  end if;

  if old.status = 'pending'
    and new.status in ('confirmed', 'declined')
    and actor = listing_owner then
    if new.status = 'confirmed' then
      new.confirmed_at = now();
    else
      new.declined_at = now();
    end if;
    return new;
  end if;

  if old.status in ('pending', 'confirmed')
    and new.status = 'cancelled'
    and actor = old.requester_id then
    new.cancelled_at = now();
    return new;
  end if;

  if old.status = 'confirmed'
    and new.status = 'completed'
    and actor = listing_owner
    and current_date >= old.end_date then
    new.completed_at = now();
    return new;
  end if;

  raise exception 'invalid booking status transition';
end;
$$;

create trigger guard_booking_insert
before insert on public.bookings
for each row execute function public.guard_booking_change();

create trigger guard_booking_update
before update on public.bookings
for each row execute function public.guard_booking_change();

alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.bookings enable row level security;

create policy "Profiles are readable by owner"
on public.profiles for select
using (id = auth.uid());

create policy "Users can insert their profile"
on public.profiles for insert
with check (id = auth.uid());

create policy "Users can update their profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can delete their profile"
on public.profiles for delete
using (id = auth.uid());

create policy "Users manage their pets"
on public.pets for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Published listings are publicly readable"
on public.listings for select
using (status = 'published' and deleted_at is null);

create policy "Owners can read all own listings"
on public.listings for select
using (owner_id = auth.uid());

create policy "Owners manage own listings"
on public.listings for insert
with check (owner_id = auth.uid());

create policy "Owners update own listings"
on public.listings for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Owners delete own listings"
on public.listings for delete
using (owner_id = auth.uid());

create policy "Published listing images are publicly readable"
on public.listing_images for select
using (public.listing_is_public(listing_id));

create policy "Listing owners read all own listing images"
on public.listing_images for select
using (public.current_user_owns_listing(listing_id));

create policy "Listing owners manage listing images"
on public.listing_images for all
using (public.current_user_owns_listing(listing_id))
with check (public.current_user_owns_listing(listing_id));

create policy "Booking participants can read bookings"
on public.bookings for select
using (requester_id = auth.uid() or public.current_user_owns_listing(listing_id));

create policy "Requesters can create own booking requests"
on public.bookings for insert
with check (requester_id = auth.uid());

create policy "Requesters can cancel own bookings"
on public.bookings for update
using (requester_id = auth.uid() and status in ('pending', 'confirmed'))
with check (requester_id = auth.uid() and status = 'cancelled');

create policy "Listing owners can manage incoming booking status"
on public.bookings for update
using (public.current_user_owns_listing(listing_id) and status in ('pending', 'confirmed'))
with check (public.current_user_owns_listing(listing_id) and status in ('confirmed', 'declined', 'completed'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-photos',
  'listing-photos',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read listing photos"
on storage.objects for select
using (
  bucket_id = 'listing-photos'
  and public.listing_is_public(public.storage_folder_listing_id(name))
);

create policy "Listing owners upload listing photos"
on storage.objects for insert
with check (
  bucket_id = 'listing-photos'
  and public.current_user_owns_listing(public.storage_folder_listing_id(name))
);

create policy "Listing owners update listing photos"
on storage.objects for update
using (
  bucket_id = 'listing-photos'
  and public.current_user_owns_listing(public.storage_folder_listing_id(name))
)
with check (
  bucket_id = 'listing-photos'
  and public.current_user_owns_listing(public.storage_folder_listing_id(name))
);

create policy "Listing owners delete listing photos"
on storage.objects for delete
using (
  bucket_id = 'listing-photos'
  and public.current_user_owns_listing(public.storage_folder_listing_id(name))
);
