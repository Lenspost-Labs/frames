import { baseSepolia, degen, base } from '@wagmi/core/chains';
import { createConfig, http } from '@wagmi/core';
import { ham } from '@/chains';

export const config = createConfig({
  transports: {
    [baseSepolia?.id]: http(),
    [degen.id]: http(),
    [base.id]: http(),
    [ham.id]: http()
  },
  chains: [baseSepolia, degen, base, ham],
  ssr: true
});
