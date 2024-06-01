import { baseSepolia, degen, base } from '@wagmi/core/chains';
import { createConfig, http } from '@wagmi/core';

export const config = createConfig({
  transports: {
    [baseSepolia?.id]: http(),
    [degen.id]: http(),
    [base.id]: http()
  },
  chains: [baseSepolia, degen, base],
  ssr: true
});
