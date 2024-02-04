import { NextPage } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { config } from "@/config/config";

const imageUrl =
  "https://lenspost.s3.ap-south-1.amazonaws.com/user/109/canvases/19942-0.png";

const tokenUri =
  "https://ipfs.io/ipfs/Qmey27iWG41PTiSgdiCbkk7eQet632LhCmwVzXhuJy4kg8";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Mint",
    },
  ],
  image: imageUrl,
  post_url: `${config?.APP_URL}/api/frame?image=${imageUrl}`,
});

export const metadata: Metadata = {
  title: "Frames Lenspost",
  description: "Share farcater frames from Lenspost",
  openGraph: {
    title: "Frames Lenspost",
    description: "Share farcater frames from Lenspost",
    images: [imageUrl],
  },
  other: {
    ...frameMetadata,
  },
};

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <h1 className="font-bold text-5xl">Frames Lenspost</h1>
      <a
        href="https://app.lenspost.xyz"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Lenspost{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          A web3 onchain canvas.
        </p>
      </a>
    </main>
  );
};

export default Home;
