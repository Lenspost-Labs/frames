import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  CAST_ACTION_URL,
  FRAME_PAGE_NAME,
  MINT_PAGE_URL,
  DESCRIPTION,
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

  const {
    creatorSponsored,
    gatedChannels,
    imageUrl,
    isFollow,
    isRecast,
    isLike,
    slug
  } = await getFrameData(id);

  let btns: FrameButtonMetadata[] = [
    {
      label: `${[
        isFollow ? 'Follow' : '',
        isRecast ? 'Recast' : '',
        isLike ? 'Like' : '',
        gatedChannels ? `Follow ${gatedChannels}` : ''
      ]
        .filter(Boolean)
        .join(
          ', '
        )} ${isLike || isRecast || isFollow || gatedChannels ? `👉` : ''} Mint`
    }
  ];

  if (!creatorSponsored) {
    btns.push({
      target: `${MINT_PAGE_URL}/mint/${slug}`,
      label: 'Mint on Poster',
      action: 'link'
    });
  }

  btns.push({
    target: CAST_ACTION_URL,
    label: 'Action',
    action: 'link'
  });

  const frameMetadata = getFrameMetadata({
    image: {
      aspectRatio: '1:1',
      src: imageUrl
    },
    postUrl: `${APP_URL}/api/frame/${id}`,
    // @ts-ignore
    buttons: btns
  });

  return {
    twitter: {
      creator: LENSPOST_TWITTER_USERNAME,
      site: LENSPOST_TWITTER_USERNAME,
      card: 'summary_large_image',
      description: DESCRIPTION,
      title: FRAME_PAGE_NAME,
      images: [imageUrl]
    },
    openGraph: {
      description: DESCRIPTION,
      title: FRAME_PAGE_NAME,
      images: [imageUrl],
      url: APP_URL
    },
    keywords: [
      'Lenspost Mint',
      'Lenspost NFT',
      'Lenspost',
      'Poster',
      'Mint',
      'NFT'
    ],
    authors: [{ url: LENSPOST_APP_URL, name: AUTHOR }],
    metadataBase: new URL(APP_URL),
    other: { ...frameMetadata },
    description: DESCRIPTION,
    icons: ['/favicon.ico'],
    title: FRAME_PAGE_NAME,
    creator: AUTHOR
  };
};

const Home = async ({ params }: Props) => {
  const {
    gatedCollections,
    creatorSponsored,
    contractAddress,
    gatedChannels,
    contractType,
    allowedMints,
    redirectLink,
    isRecast,
    isFollow,
    imageUrl,
    message,
    minters,
    chainId,
    isError,
    isLike,
    owner,
    slug
  } = await getFrameData(params?.id);

  if (isError) {
    return <Default text={message} />;
  }

  return (
    <FrameCard
      gatedCollections={gatedCollections}
      creatorSponsored={creatorSponsored}
      contractAddress={contractAddress}
      gatedChannels={gatedChannels}
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
