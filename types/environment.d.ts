// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEYNAR_API_KEY: string;
    ENVIRONMENT: string;
  }
}
