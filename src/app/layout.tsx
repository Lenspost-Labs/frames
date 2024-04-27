import type { Metadata } from 'next';

import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  DESCRIPTION,
  APP_NAME,
  APP_URL,
  AUTHOR
} from '@/data';
import { Inter } from 'next/font/google';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  twitter: {
    creator: LENSPOST_TWITTER_USERNAME,
    images: [`${APP_URL}/logo2.png`],
    site: LENSPOST_TWITTER_USERNAME,
    card: 'summary_large_image',
    description: DESCRIPTION,
    title: APP_NAME
  },
  openGraph: {
    images: [`${APP_URL}/logo2.png`],
    description: DESCRIPTION,
    title: APP_NAME,
    url: APP_URL
  },
  keywords: ['Lenspost frame', 'Lenspost', 'Frames', 'Poster', 'Mint', 'NFT'],
  authors: [{ url: LENSPOST_APP_URL, name: AUTHOR }],
  metadataBase: new URL(APP_URL),
  description: DESCRIPTION,
  icons: ['/favicon.ico'],
  title: APP_NAME,
  creator: AUTHOR
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen items-center justify-center bg-[#B7DAEE] p-4 sm:p-10">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
