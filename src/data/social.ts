import { FarcasterLogo, DiscordLogo, XLogo } from '@/assets';
import { LENSPOST_TWITTER_USERNAME } from './constants';

export const SOCIAL = [
  {
    url: `https://twitter.com/${LENSPOST_TWITTER_USERNAME}`,
    icon: XLogo,
    name: 'Twitter'
  },
  {
    url: 'https://discord.gg/yHMXQE2DNb',
    icon: DiscordLogo,
    name: 'Discord'
  },
  {
    url: 'https://warpcast.com/poster',
    icon: FarcasterLogo,
    name: 'Farcaster'
  }
];
