export const config = {
  neynar: {
    apiKey: (process.env.NEYNAR_API_KEY as string) || "",
  },

  APP_URL: "https://frames.lenspost.xyz",
  BACKEND_URL: "https://api.lenspost.xyz",
  TEST_BACKEND_URL: "https://lenspost-development.up.railway.app",
};
