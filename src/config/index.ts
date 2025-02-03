import {
  baseSepolia,
  arbitrum,
  polygon,
  degen,
  morph,
  base
} from '@wagmi/core/chains';
import { campNetworkTestnetV2, ham, og } from '@/chains';
import { createConfig, http } from '@wagmi/core';

export const config = createConfig({
  transports: {
    [campNetworkTestnetV2.id]: http(),
    [baseSepolia?.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [degen.id]: http(),
    [morph.id]: http(),
    [base.id]: http(),
    [ham.id]: http(),
    [og.id]: http()
  },
  chains: [
    campNetworkTestnetV2,
    baseSepolia,
    polygon,
    arbitrum,
    degen,
    morph,
    base,
    ham,
    og
  ],
  ssr: true
});
