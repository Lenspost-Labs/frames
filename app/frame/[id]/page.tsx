import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "@/config/config";
import Image from "next/image";
import { chainName } from "@/utils";
import { ExternalLinkIcon } from "@/assets";
import { getFrameData } from "@/services";
import { Button, Default } from "@/components";
import { APP_TWITTER_ID } from "@/constants";

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

  const { imageUrl, isLike, isFollow, isRecast } = await getFrameData(id);

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
      url: `${config?.APP_URL}/frame/${id}`,
    },
    twitter: {
      card: "summary",
      creator: APP_TWITTER_ID,
      title: "Frames Lenspost",
      description: "Share farcater frames from Lenspost",
      images: ["/favicon.ico"],
      site: APP_TWITTER_ID,
    },
    other: {
      ...frameMetadata,
    },
    metadataBase: new URL(config?.APP_URL || ""),
  };
}

const Home = async ({ params }: Props) => {
  const {
    frameId,
    imageUrl,
    allowedMints,
    isFollow,
    isLike,
    isRecast,
    noOfNftsMinited,
    owner,
    contract_address,
    contract_type,
    creatorSponsored,
    redirectLink,
    chainId,
    slug,
    message,
  } = await getFrameData(params.id);

  if (!frameId) {
    return <Default text={message} />;
  }

  return (
    <main className="p-3 h-screen w-screen gap-3 flex flex-col justify-start items-center lg:flex-row lg:justify-center lg:items-center lg:p-8">
      <Image
        src={imageUrl}
        alt="Frame Image"
        width={500}
        height={500}
        className="object-contain rounded-lg"
      />

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <p className="font-semibold">Contract Address:</p>
            <p className="truncate">{contract_address}</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <p className="font-semibold">Contract Type:</p>
            <p className="truncate">{contract_type}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Network:</p>
            <p>{chainName(chainId as any)}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-3">
          <p className="font-semibold">Owner:</p>
          <p>{owner}</p>
        </div>
        {isLike || isFollow || isRecast ? (
          <div>
            <p className="font-semibold">Gated with:</p>
            {isLike && <p>Like</p>}
            {isRecast && <p>Recast</p>}
            {isFollow && <p>Follow</p>}
          </div>
        ) : null}
        <div>
          <div className="flex gap-3">
            <p className="font-semibold">Allowed Mints:</p>
            <p>{allowedMints}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">No of NFTs Minted:</p>
            <p>{noOfNftsMinited}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Sponsored Mint:</p>
            <p>{creatorSponsored ? "Yes" : "No"}</p>
          </div>
        </div>
        {redirectLink && (
          <div className="flex gap-3">
            <h3 className="font-semibold text-xl">Know more</h3>
            <a href={redirectLink} target="_blank">
              <ExternalLinkIcon />
            </a>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-1">
          {/* {slug && (
            <Button
              title="Mint"
              target={`https://mint.lenspost.xyz/${slug}`}
              className="flex justify-center items-center gap-1 w-full p-2 text-center bg-purple-500  text-white rounded-tl-2xl rounded-br-2xl cursor-pointer"
              icon={<ExternalLinkIcon />}
            />
          )} */}
          <Button
            title="Remix on Lenspost"
            target="https://app.lenspost.xyz"
            className="w-full p-2 text-center bg-purple-500  text-white rounded-tl-2xl rounded-br-2xl cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
