import { NextPage } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "@/config/config";
import axios from "axios";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  console.log("id", id);

  const res = await axios.get(
    `${config?.BACKEND_URL}/util/get-frame-data?frameId=${id}`
  );

  const { imageUrl } = res.data?.data;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Mint",
      },
    ],
    image: {
      src: imageUrl,
      aspectRatio: "1:1",
    },
    post_url: `${config?.APP_URL}/api/frame?frameId=${id}`,
  });

  return {
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
    metadataBase: new URL(config?.APP_URL || ""),
  };
}

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
