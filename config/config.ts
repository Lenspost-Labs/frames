const PROD_BACKEND_URL = "https://api.lenspost.xyz";
const DEV_BACKEND_URL = "https://lenspost-development.up.railway.app";

const PROD_APP_URL = "https://frames.lenspost.xyz";
const DEV_APP_URL = "https://dev-frames.lenspost.xyz";
const LOCAL_APP_URL = "http://localhost:3000";

export const config = {
  neynar: {
    apiKey: process.env.NEYNAR_API_KEY || "",
  },

  APP_URL:
    process.env.ENVIRONMENT === "production"
      ? PROD_APP_URL
      : process.env.ENVIRONMENT === "development"
      ? DEV_APP_URL
      : LOCAL_APP_URL,
  BACKEND_URL:
    process.env.ENVIRONMENT === "production"
      ? PROD_BACKEND_URL
      : DEV_BACKEND_URL,

  ENVIRONMENT: process.env.ENVIRONMENT || "development",
};
