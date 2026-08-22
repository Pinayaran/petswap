import { useQuery } from '@tanstack/react-query';
import { getCurrentProfile } from '../lib/profileApi';

export function useCurrentProfile() {
  return useQuery({
    queryKey: ['profiles', 'current'],
    queryFn: getCurrentProfile,
  });
}
