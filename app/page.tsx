import { NextPage } from "next";
import type { Metadata } from "next";
import { config } from "@/config/config";
import Default from "@/components/Default";

export const metadata: Metadata = {
  title: "Frames Lenspost",
  description: "Share farcater frames from Lenspost",
  icons: [
    // "/logo.png",
    // "/favicon-32x32.png",
    // "/favicon-16x16.png",
    // "/apple-touch-icon.png",
    "/favicon.ico",
  ],
  metadataBase: new URL(config?.APP_URL || ""),
};

const Home: NextPage = () => {
  return <Default text="Frames Lenspost" />;
};

export default Home;
