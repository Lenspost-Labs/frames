import { baseSepolia, arbitrum, degen, base } from '@wagmi/core/chains';
import { createConfig, http } from '@wagmi/core';
import { ham, og } from '@/chains';

export const config = createConfig({
  transports: {
    [baseSepolia?.id]: http(),
    [arbitrum.id]: http(),
    [degen.id]: http(),
    [base.id]: http(),
    [ham.id]: http(),
    [og.id]: http()
  },
  chains: [baseSepolia, arbitrum, degen, base, ham, og],
  ssr: true
});
