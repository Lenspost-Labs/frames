import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  BLINK_PAGE_NAME,
  DESCRIPTION,
  APP_URL,
  AUTHOR
} from '@/data';
import { ActionCard, Default } from '@/components';
import { getBlinkData } from '@/services';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const id = params.id;

  const { imageUrl } = await getBlinkData(id);

  return {
    twitter: {
      creator: LENSPOST_TWITTER_USERNAME,
      site: LENSPOST_TWITTER_USERNAME,
      card: 'summary_large_image',
      description: DESCRIPTION,
      title: BLINK_PAGE_NAME,
      images: [imageUrl]
    },
    openGraph: {
      description: DESCRIPTION,
      title: BLINK_PAGE_NAME,
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
    description: DESCRIPTION,
    icons: ['/favicon.ico'],
    title: BLINK_PAGE_NAME,
    creator: AUTHOR
  };
};

const Home = async ({ params }: Props) => {
  const { imageUrl, isError, message } = await getBlinkData(params?.id);

  if (isError) {
    return <Default text={message} />;
  }

  return <ActionCard imageUrl={imageUrl} />;
};

export default Home;
