import { test } from '@playwright/test';

test('requester creates a booking and listing owner confirms it', async () => {
  test.skip(
    true,
    'Enable when auth, listing, booking pages, and deterministic Supabase test data exist.',
  );

  // Required journey: sign in → create request → owner confirms → requester sees Confirmed.
});
