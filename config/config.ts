import { Hex } from "viem";

export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },
  sponsorWallet: (`0x${process.env.SPONSOR_WALLET_PRIVATE_KEY}` as Hex) || undefined,
  fundingWallet: (`0x${process.env.FUNDING_WALLET_PRIVATE_KEY}` as Hex) || undefined,
  testWallet: (`0x${process.env.TEST_WALLET_PRIVATE_KEY}` as Hex) || undefined,

  APP_URL: "https://test-frame-lenspost1.vercel.app",
  BACKEND_URL: "https://api.lenspost.xyz",
};
