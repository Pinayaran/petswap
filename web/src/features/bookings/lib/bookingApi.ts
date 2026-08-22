import { getSupabaseClient } from '@/shared/lib/supabase';
import type { Database } from '@/shared/types/database.types';

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

export async function listMyBookings(): Promise<Booking[]> {
  const { data, error } = await getSupabaseClient()
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createBookingRequest(values: BookingInsert): Promise<Booking> {
  const { data, error } = await getSupabaseClient()
    .from('bookings')
    .insert(values)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateBookingStatus(
  bookingId: string,
  status: Database['public']['Enums']['booking_status'],
): Promise<Booking> {
  const { data, error } = await getSupabaseClient()
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
