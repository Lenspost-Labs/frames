import { http, createConfig } from "@wagmi/core";
import { base, baseSepolia, sepolia } from "@wagmi/core/chains";

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia, sepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});
