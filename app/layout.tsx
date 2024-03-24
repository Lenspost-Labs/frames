import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Metadata } from "next";
import { config } from "@/config/config";
import { APP_TWITTER_ID } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frames Lenspost",
  description: "Share farcater frames from Lenspost",
  icons: ["/favicon.ico"],
  metadataBase: new URL(config?.APP_URL),
  keywords: ["Frames", "Lenspost", "Farcater"],
  creator: "Lenspost",
  applicationName: "Frames Lenspost",
  openGraph: {
    title: "Frames Lenspost",
    description: "Share farcater frames from Lenspost",
    images: ["/favicon.ico"],
    url: config?.APP_URL,
  },
  twitter: {
    card: "summary",
    creator: APP_TWITTER_ID,
    title: "Frames Lenspost",
    description: "Share farcater frames from Lenspost",
    images: ["/favicon.ico"],
    site: APP_TWITTER_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
