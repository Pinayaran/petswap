import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Database } from '@/shared/types/database.types';

export type Listing = Database['public']['Tables']['listings']['Row'] & {
  listing_images: Database['public']['Tables']['listing_images']['Row'][];
};

export async function listPublishedListings(): Promise<Listing[]> {
  const { data, error } = await getSupabaseClient()
    .from('listings')
    .select('*, listing_images(*)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function listMyListings(): Promise<Database['public']['Tables']['listings']['Row'][]> {
  const { data, error } = await getSupabaseClient()
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
