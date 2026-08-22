import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Database } from '@/shared/types/database.types';

export type Pet = Database['public']['Tables']['pets']['Row'];

export async function listMyPets(): Promise<Pet[]> {
  const { data, error } = await getSupabaseClient()
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
