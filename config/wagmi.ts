import { http, createConfig } from "@wagmi/core";
import { base, baseGoerli } from "@wagmi/core/chains";
import { config } from "./config";

export const wagmiConfig = createConfig({
  chains: [base, baseGoerli],
  transports: {
    [base.id]: http(),
    [baseGoerli.id]: http(),
  },
});
