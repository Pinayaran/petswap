import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBookingRequest, listMyBookings, updateBookingStatus, type BookingInsert } from '../lib/bookingApi';
import type { Database } from '@/shared/types/database.types';

export function useMyBookings() {
  return useQuery({
    queryKey: ['bookings', 'mine'],
    queryFn: listMyBookings,
  });
}

export function useCreateBookingRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: BookingInsert) => createBookingRequest(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { bookingId: string; status: Database['public']['Enums']['booking_status'] }) =>
      updateBookingStatus(values.bookingId, values.status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
