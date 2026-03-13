import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:4000/api';

test.describe('GET /api/users/:id', () => {

  test('returns 200 status for a given user ID', async () => {
    const context = await request.newContext();

    const response = await context.get(`${BASE_URL}/users/123`);

    expect(response.status()).toBe(200);

    await context.dispose();
  });

});
