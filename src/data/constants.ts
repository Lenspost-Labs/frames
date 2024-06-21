import { BACKEND_API } from '.';

const APP_URLS = Object.freeze({
  local: ' https://48ca-49-43-161-10.ngrok-free.app',
  development: 'https://dev-frames.vercel.app',
  production: 'https://frames.poster.fun'
  // production: ' https://48ca-49-43-161-10.ngrok-free.app'
});

const MINT_URLS = Object.freeze({
  development: 'https://dev-mint-poster.vercel.app',
  local: 'https://dev-mint-poster.vercel.app',
  production: 'https://mint.poster.fun'
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

// Lenspost labs
export const LENSPOST_APP_NAME = 'Poster';
export const LENSPOST_DESCRIPTION = `${LENSPOST_APP_NAME} is a fun onchain 'canva' that turns NFT holders into content creators with one click drag-drop-remix! Make NFTs do more for you as you churn out DOPE memes, gifs, social content & more! The most fun way to permissionlessly collaborate, monetize & even split revenues across chains. We're NFT INFRA at the back, RAVE party in the front - powering co-creation, revenue share & social distribution with BIG MEME ENERGY!`;
export const LENSPOST_HOME_URL = 'https://poster.fun';
export const LENSPOST_APP_URL = 'https://app.poster.fun';

// Lenspost labs social
export const LENSPOST_TWITTER_USERNAME = '@Posterdotfun';

// addresses
export const LENSPOST_ETH_ADDRESS =
  '0x77fAD8D0FcfD481dAf98D0D156970A281e66761b';
export const LENSPOST_SOLANA_ADDRESS =
  '2PsV6hNEUc3rSMGqKcHTnRBemaWBQX3dYgUqVtEFxkwa';
export const NULL_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

// URLs
export const BACKEND_ENDPOINT = BACKEND_API[ENV as keyof typeof BACKEND_API];
export const MINT_PAGE_URL = MINT_URLS[ENV as keyof typeof MINT_URLS];
export const S3_IMAGE_URL = 'https://lenspost.s3.ap-south-1.amazonaws.com';
export const CDN_IMAGE_URL = 'https://lenspost.b-cdn.net';

// Zora
export const CREATORS_REWARD_FEE = '0.000777';
