import { Hex } from "viem";

export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },
  contractAddress: (process.env.SMART_CONTRACT as `0x${string}`) || "",
  wallet: (`0x${process.env.WALLET_PRIVATE_KEY}` as Hex) || undefined,

  pinataJwtKey: process.env.PINATA_JWT_KEY || "",

  APP_URL: process.env.APP_URL || "https://test-frame-app16.vercel.app",
};
