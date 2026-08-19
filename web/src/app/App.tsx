import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { AuthScreen } from '@/features/auth';
import { SearchScreen } from '@/features/search';
import { ListingDetailPage, ListingsScreen, CreateListingPage } from '@/features/listings';
import { PetsScreen, CreatePetPage } from '@/features/pets';
import { BookingsScreen } from '@/features/bookings';
import { ProfileScreen } from '@/features/profiles';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/login" element={<AuthScreen onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/" element={isLoggedIn ? <SearchScreen /> : <Navigate to="/login" />} />
          <Route path="/listing/:id" element={isLoggedIn ? <ListingDetailPage /> : <Navigate to="/login" />} />
          <Route path="/my-listings" element={isLoggedIn ? <ListingsScreen /> : <Navigate to="/login" />} />
          <Route path="/my-listings/new" element={isLoggedIn ? <CreateListingPage /> : <Navigate to="/login" />} />
          <Route path="/my-pets" element={isLoggedIn ? <PetsScreen /> : <Navigate to="/login" />} />
          <Route path="/my-pets/new" element={isLoggedIn ? <CreatePetPage /> : <Navigate to="/login" />} />
          <Route path="/bookings" element={isLoggedIn ? <BookingsScreen /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <ProfileScreen /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
