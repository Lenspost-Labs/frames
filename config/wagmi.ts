import { http, createConfig } from "@wagmi/core";
import { base, polygonMumbai } from "@wagmi/core/chains";
import { config } from "./config";

export const wagmiConfig = createConfig({
  chains: [base, polygonMumbai],
  transports: {
    [base.id]: http(),
    [polygonMumbai.id]: http(),
  },
});
