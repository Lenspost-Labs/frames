import { Hex } from "viem";

export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },
  wallet: (`0x${process.env.WALLET_PRIVATE_KEY}` as Hex) || undefined,
  testWallet: (`0x${process.env.TEST_WALLET_PRIVATE_KEY}` as Hex) || undefined,

  APP_URL: "https://test-frame-lenspost.vercel.app",
  BACKEND_URL: "https://api.lenspost.xyz",
};
