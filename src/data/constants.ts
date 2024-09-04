import { BACKEND_API } from '.';

const APP_URLS = Object.freeze({
  development: 'https://dev-frames.vercel.app',
  production: 'https://frames.poster.fun',
  local: 'http://localhost:3000'
});

const MINT_URLS = Object.freeze({
  development: 'https://dev-mint-poster.vercel.app',
  local: 'https://dev-mint-poster.vercel.app',
  production: 'https://mint.poster.fun'
});

const CAST_ACTION_URLS = Object.freeze({
  development:
    'https://warpcast.com/~/add-cast-action?url=https://dev-cast-action.vercel.app/cast-frames/frames/actions/frametest',
  production:
    'https://warpcast.com/~/add-cast-action?url=https://cast-action.poster.fun/cast-frames/frames/actions/frametest',
  local:
    'https://warpcast.com/~/add-cast-action?url=https://dev-cast-action.vercel.app/cast-frames/frames/actions/frametest'
});

const LENSPOST_APP_URLS = Object.freeze({
  development: 'https://staging.poster.fun',
  production: 'https://app.poster.fun',
  local: 'https://app.poster.fun'
});

// Environments
export const ENV = process.env.ENVIRONMENT;

// Environment Variables
export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;
export const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;
export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

// Application
export const APP_NAME = 'Poster frame page';
export const DESCRIPTION = `${APP_NAME} is a frame for Farcaster.`;
export const AUTHOR = 'Lenspost labs';
export const APP_URL = APP_URLS[ENV as keyof typeof APP_URLS];

// pages
export const FRAME_PAGE_NAME = 'Poster Frame Page';
export const FRAME_DESCRIPTION = `${FRAME_PAGE_NAME} is a frame for Farcaster.`;

export const BLINK_PAGE_NAME = 'Poster Blink Page';
export const BLINK_DESCRIPTION = `${BLINK_PAGE_NAME} is a blink for solana actions.`;

// Lenspost labs
export const LENSPOST_APP_NAME = 'Poster';
export const LENSPOST_DESCRIPTION = `${LENSPOST_APP_NAME} is a fun onchain 'canva' that turns NFT holders into content creators with one click drag-drop-remix! Make NFTs do more for you as you churn out DOPE memes, gifs, social content & more! The most fun way to permissionlessly collaborate, monetize & even split revenues across chains. We're NFT INFRA at the back, RAVE party in the front - powering co-creation, revenue share & social distribution with BIG MEME ENERGY!`;
export const LENSPOST_HOME_URL = 'https://poster.fun';
export const LENSPOST_APP_URL =
  LENSPOST_APP_URLS[ENV as keyof typeof LENSPOST_APP_URLS];

// Lenspost labs social
export const LENSPOST_TWITTER_USERNAME = 'Posterdotfun';

// addresses
export const LENSPOST_ETH_ADDRESS =
  '0x77fAD8D0FcfD481dAf98D0D156970A281e66761b';
export const LENSPOST_SOLANA_ADDRESS =
  '2PsV6hNEUc3rSMGqKcHTnRBemaWBQX3dYgUqVtEFxkwa';
export const NULL_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

// URLs
export const CAST_ACTION_URL =
  CAST_ACTION_URLS[ENV as keyof typeof CAST_ACTION_URLS];
export const BACKEND_ENDPOINT = BACKEND_API[ENV as keyof typeof BACKEND_API];
export const MINT_PAGE_URL = MINT_URLS[ENV as keyof typeof MINT_URLS];
export const S3_IMAGE_URL = 'https://lenspost.s3.ap-south-1.amazonaws.com';
export const CDN_IMAGE_URL = 'https://lenspost.b-cdn.net';
export const AIRSTACK_API = 'https://api.airstack.xyz/gql';

// Zora
export const CREATORS_REWARD_FEE = '0.000777';
