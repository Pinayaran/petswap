import { useQuery } from '@tanstack/react-query';
import { listMyListings, listPublishedListings } from '../lib/listingApi';

export function usePublishedListings() {
  return useQuery({
    queryKey: ['listings', 'published'],
    queryFn: listPublishedListings,
  });
}

export function useMyListings() {
  return useQuery({
    queryKey: ['listings', 'mine'],
    queryFn: listMyListings,
  });
}
