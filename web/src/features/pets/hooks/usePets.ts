import { useQuery } from '@tanstack/react-query';
import { listMyPets } from '../lib/petApi';

export function useMyPets() {
  return useQuery({
    queryKey: ['pets', 'mine'],
    queryFn: listMyPets,
  });
}
