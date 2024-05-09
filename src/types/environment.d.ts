// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SENTRY_AUTH_TOKEN: string;
    AIRSTACK_API_KEY: string;
    NEYNAR_API_KEY: string;
    ENVIRONMENT: string;
  }
}
