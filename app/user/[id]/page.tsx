import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "@/configs/config";
import Image from "next/image";
import { Button, Default } from "@/components";
import { APP_TWITTER_ID } from "@/constants";
import { getUserData } from "@/services/getUserData";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  console.log("id", id);

  const { imageURL, userId, slug } = await getUserData(id);

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Next Canvas",
        postUrl: `${config?.APP_URL}/api/user/${userId}`,
      },
    ],
    image: {
      src: imageURL,
      aspectRatio: "1:1",
    },
    post_url: `${config?.APP_URL}/api/user?userId={id}`,
  });

  return {
    title: "User Frames Lenspost",
    description: "Share farcater frames from Lenspost",
    openGraph: {
      title: "Frames Lenspost",
      description: "Share farcater frames from Lenspost",
      images: [imageURL],
      url: `${config?.APP_URL}/frame/${id}`,
    },
    twitter: {
      card: "summary",
      creator: APP_TWITTER_ID,
      title: "Frames Lenspost",
      description: "Share farcater frames from Lenspost",
      images: [imageURL],
      site: APP_TWITTER_ID,
    },
    other: {
      ...frameMetadata,
    },
    metadataBase: new URL(config?.APP_URL || ""),
  };
}

const Home = async ({ params }: Props) => {
  const { userId, imageURL, slug } = await getUserData(params.id);

  console.log(params)
  console.log("userId", userId);

  if (!userId) {
    return (
      <Default text={"Please append your userId to the end of frame URL"} />
    );
  }

  return (
    <main className="p-3 h-screen w-screen gap-3 flex flex-col justify-start items-center lg:flex-row lg:justify-center lg:items-center lg:p-8">
      <Image
        src={imageURL}
        alt="Frame Image"
        width={500}
        height={500}
        className="object-contain rounded-lg"
      />

      <div className="flex flex-col gap-3">
        <Button
          title="Remix on Lenspost"
          target="https://app.lenspost.xyz"
          className="w-full p-2 text-center bg-purple-500  text-white rounded-tl-2xl rounded-br-2xl cursor-pointer"
        />
      </div>
    </main>
  );
};

export default Home;
