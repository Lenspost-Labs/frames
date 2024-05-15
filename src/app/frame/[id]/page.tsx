import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  CDN_IMAGE_URL,
  MINT_PAGE_URL,
  S3_IMAGE_URL,
  DESCRIPTION,
  APP_NAME,
  APP_URL,
  AUTHOR
} from '@/data';
import {
  FrameButtonMetadata,
  getFrameMetadata
} from '@coinbase/onchainkit/frame';
import { FrameCard, Default } from '@/components';
import { getFrameData } from '@/services';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const id = params.id;

  const { creatorSponsored, imageUrl, isFollow, isRecast, isLike, slug } =
    await getFrameData(id);
  const imageCdnUrl = imageUrl?.replace(S3_IMAGE_URL, CDN_IMAGE_URL);

  let btns: FrameButtonMetadata[] = [
    {
      label: `${[
        isFollow ? 'Follow' : '',
        isRecast ? 'Recast' : '',
        isLike ? 'Like' : ''
      ]
        .filter(Boolean)
        .join(', ')} ${isLike || isRecast || isFollow ? `👉` : ''} Mint`
    }
  ];

  if (!creatorSponsored) {
    btns.push({
      target: `${MINT_PAGE_URL}/mint/${slug}`,
      label: 'Mint on Poster',
      action: 'link'
    });
  }

  const frameMetadata = getFrameMetadata({
    post_url: `https://8e23-49-43-163-59.ngrok-free.app/api/frame?frameId=${id}`,
    image: {
      aspectRatio: '1:1',
      src: imageCdnUrl
    },
    // @ts-ignore
    buttons: btns
  });

  return {
    twitter: {
      creator: LENSPOST_TWITTER_USERNAME,
      site: LENSPOST_TWITTER_USERNAME,
      card: 'summary_large_image',
      description: DESCRIPTION,
      images: [imageCdnUrl],
      title: APP_NAME
    },
    keywords: [
      'Lenspost Mint',
      'Lenspost NFT',
      'Lenspost',
      'Poster',
      'Mint',
      'NFT'
    ],
    openGraph: {
      description: DESCRIPTION,
      images: [imageCdnUrl],
      title: APP_NAME,
      url: APP_URL
    },
    authors: [{ url: LENSPOST_APP_URL, name: AUTHOR }],
    metadataBase: new URL(APP_URL),
    other: { ...frameMetadata },
    description: DESCRIPTION,
    icons: ['/favicon.ico'],
    creator: AUTHOR,
    title: APP_NAME
  };
};

const Home = async ({ params }: Props) => {
  const {
    isGatedCollections,
    creatorSponsored,
    contractAddress,
    isGatedChannels,
    contractType,
    allowedMints,
    redirectLink,
    isRecast,
    isFollow,
    imageUrl,
    message,
    minters,
    chainId,
    isLike,
    owner,
    slug
  } = await getFrameData(params?.id);

  if (message) {
    return <Default text={message} />;
  }

  return (
    <FrameCard
      isGatedCollections={isGatedCollections}
      creatorSponsored={creatorSponsored}
      contractAddress={contractAddress}
      isGatedChannels={isGatedChannels}
      contractType={contractType}
      allowedMints={allowedMints}
      redirectLink={redirectLink}
      isRecast={isRecast}
      isFollow={isFollow}
      imageUrl={imageUrl}
      minters={minters}
      chainId={chainId}
      isLike={isLike}
      owner={owner}
      slug={slug}
    />
  );
};

export default Home;
