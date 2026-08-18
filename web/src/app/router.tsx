import { createBrowserRouter } from 'react-router-dom';
import { AuthScreen } from '@/features/auth';
import { BookingsScreen } from '@/features/bookings';
import { ListingsScreen } from '@/features/listings';
import { PetsScreen } from '@/features/pets';
import { ProfileScreen } from '@/features/profiles';
import { SearchScreen } from '@/features/search';

export const router = createBrowserRouter([
  { path: '/', Component: SearchScreen },
  { path: '/login', Component: AuthScreen },
  { path: '/profile', Component: ProfileScreen },
  { path: '/pets', Component: PetsScreen },
  { path: '/listings', Component: ListingsScreen },
  { path: '/bookings', Component: BookingsScreen },
]);
