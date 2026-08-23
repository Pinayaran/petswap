-- Run after `npx supabase db reset`, then create/sign in local users through
-- Studio or app flows before testing RLS with authenticated JWTs.

select
  'confirmed bookings use end-exclusive overlap protection' as check_name,
  exists (
    select 1
    from pg_constraint
    where conname = 'bookings_no_confirmed_overlap'
      and conrelid = 'public.bookings'::regclass
  ) as passed;

select
  'all MVP tables have RLS enabled' as check_name,
  bool_and(relrowsecurity) as passed
from pg_class
where oid in (
  'public.profiles'::regclass,
  'public.pets'::regclass,
  'public.listings'::regclass,
  'public.listing_images'::regclass,
  'public.bookings'::regclass
);

select
  'booking participant policies are installed' as check_name,
  count(*) >= 4 as passed
from pg_policies
where schemaname = 'public'
  and tablename = 'bookings';
