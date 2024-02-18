import { NextPage } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "@/config/config";
import axios from "axios";
import ImageSection from "@/components/ImageSection";
import { FrameData } from "@/types/types";
import { DetailsSection } from "@/components/DetailsSection";
import Default from "@/components/Default";

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

  const { imageUrl, isLike, isRecast, isFollow } = res.data?.data as FrameData;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: `${[
          isLike ? "Like" : "",
          isRecast ? "Recast" : "",
          isFollow ? "Follow" : "",
        ]
          .filter(Boolean) // Remove empty strings
          .join(", ")} ${isLike || isRecast || isFollow ? `👉` : ""} Mint`,
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

const Home = async ({ params }: Props) => {
  // const res = await axios.get(
  //   `${config?.BACKEND_URL}/util/get-frame-data?frameId=${params.id}`
  // );

  // const {
  //   imageUrl,
  //   allowedMints,
  //   isFollow,
  //   isLike,
  //   isRecast,
  //   isTopUp,
  //   minters,
  //   owner,
  //   tokenUri,
  // } = res.data?.data as FrameData;

  return (
    <main className="p-5 md:max-w-7xl h-screen mx-auto flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center">
      <Default />
      {/* image section */}

      {/* <ImageSection imageUrl={imageUrl} /> */}

      {/* detail section */}
      {/* <DetailsSection
        allowedMints={allowedMints}
        isFollow={isFollow}
        isLike={isLike}
        isRecast={isRecast}
        isTopUp={isTopUp}
        minters={minters}
        owner={owner}
        tokenUri={tokenUri}
      /> */}
    </main>
  );
};

export default Home;
