import { Hex } from "viem";

export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },
  contractAddress: (process.env.SMART_CONTRACT as `0x${string}`) || "",
  wallet: (`0x${process.env.WALLET_PRIVATE_KEY}` as Hex) || undefined,

  nftStorageApiKey: process.env.NFT_STORAGE_API_KEY || "",
  lightHouseApiKey: process.env.LIGHTHOUSE_API_KEY || "",

  APP_URL: process.env.APP_URL || "https://test-frame-app10.vercel.app",
};
