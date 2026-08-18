import { hasBookingConflict, isValidBookingTransition } from './bookingRules';

describe('hasBookingConflict', () => {
  const confirmed = {
    listingId: 'listing-a', startDate: '2026-09-10', endDate: '2026-09-14', status: 'confirmed' as const,
  };

  it('detects an overlapping confirmed booking on the same listing', () => {
    expect(hasBookingConflict(
      { listingId: 'listing-a', startDate: '2026-09-12', endDate: '2026-09-16' },
      [confirmed],
    )).toBe(true);
  });

  it('allows back-to-back bookings and ignores other listings or non-confirmed bookings', () => {
    expect(hasBookingConflict(
      { listingId: 'listing-a', startDate: '2026-09-14', endDate: '2026-09-18' },
      [confirmed],
    )).toBe(false);
    expect(hasBookingConflict(
      { listingId: 'listing-a', startDate: '2026-09-11', endDate: '2026-09-12' },
      [{ ...confirmed, listingId: 'listing-b' }, { ...confirmed, status: 'pending' }],
    )).toBe(false);
  });
});

describe('isValidBookingTransition', () => {
  it('allows the agreed pending and confirmed transitions', () => {
    expect(isValidBookingTransition('pending', 'confirmed')).toBe(true);
    expect(isValidBookingTransition('pending', 'declined')).toBe(true);
    expect(isValidBookingTransition('pending', 'cancelled')).toBe(true);
    expect(isValidBookingTransition('confirmed', 'completed')).toBe(true);
    expect(isValidBookingTransition('confirmed', 'cancelled')).toBe(true);
  });

  it('rejects all invalid lifecycle changes', () => {
    expect(isValidBookingTransition('pending', 'completed')).toBe(false);
    expect(isValidBookingTransition('confirmed', 'declined')).toBe(false);
    expect(isValidBookingTransition('cancelled', 'confirmed')).toBe(false);
    expect(isValidBookingTransition('completed', 'cancelled')).toBe(false);
  });
});
