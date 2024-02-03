import { Hex } from "viem";

export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },
  contractAddress: (process.env.SMART_CONTRACT as `0x${string}`) || "",
  wallet: (process.env.WALLET_PRIVATE_KEY as Hex) || undefined,

  APP_URL: process.env.APP_URL || "https://test-frame-app8.vercel.app",
};
