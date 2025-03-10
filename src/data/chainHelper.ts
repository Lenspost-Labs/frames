import {
  baseSepolia,
  arbitrum,
  polygon,
  degen,
  morph,
  base
} from '@wagmi/core/chains';
import { campNetworkTestnetV2, ham, og } from '@/chains';

export const CHAIN_HELPER = Object.freeze({
  325000: campNetworkTestnetV2,
  84532: baseSepolia,
  666666666: degen,
  42161: arbitrum,
  137: polygon,
  2818: morph,
  8453: base,
  5112: ham,
  16600: og
});
