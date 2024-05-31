import { degen, base } from '@wagmi/core/chains';
import { createConfig, http } from '@wagmi/core';

export const config = createConfig({
  transports: {
    [degen.id]: http(),
    [base.id]: http()
  },
  chains: [degen, base],
  ssr: true
});
