export const config = {
  neynar: {
    apiKey: process.env.NEYNAR_API_KEY || "",
  },
  contractAddress: process.env.SMART_CONTRACT || "",
  wallet: process.env.WALLET_PRIVATE_KEY || "",

  APP_URL: process.env.APP_URL || "https://test-frame-app7.vercel.app",
};
