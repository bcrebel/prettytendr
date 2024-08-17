import { type APIRoute } from 'astro';
import StellarSdk from 'stellar-sdk';

import { listenForProfileCompletion } from '../../services/rewardListener';

export const post: APIRoute = async ({ request }) => {
  try {
    const { publicKey } = await request.json();
    await listenForProfileCompletion(publicKey);

    return new Response(JSON.stringify({ message: 'Listening for profile completion and rewarding user.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in reward-user API:', error);
    return new Response(JSON.stringify({ error: 'Failed to reward user.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
