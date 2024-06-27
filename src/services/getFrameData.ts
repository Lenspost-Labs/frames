import { BACKEND_ENDPOINT, CDN_IMAGE_URL, S3_IMAGE_URL } from '@/data';
import { FrameData } from '@/types';

export const getFrameData = async (frameId: string): Promise<FrameData> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/util/get-frame-data?frameId=${frameId}`,
      {
        next: {
          revalidate: 60
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        description:
          'Cybersecurity Enthusiast | Support my research with a donation.',
        imageUrl: data?.imageUrl?.replace(S3_IMAGE_URL, CDN_IMAGE_URL),
        isGatedCollections: data?.gatedCollections,
        creatorSponsored: data?.creatorSponsored,
        contractAddress: data?.contract_address,
        isGatedChannels: data?.gatedChannels,
        contractType: data?.contract_type,
        redirectLink: data?.redirectLink,
        allowedMints: data?.allowedMints,
        isRecast: data?.isRecast,
        isFollow: data?.isFollow,
        title: 'Donate to Alice',
        tokenUri: data?.tokenUri,
        minters: data?.minters,
        chainId: data?.chainId,
        isTopUp: data?.isTopUp,
        isLike: data?.isLike,
        owner: data?.owner,
        frameId: data?.id,
        slug: data?.slug
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText,
        isError: true
      };
    }
  } catch (error) {
    return {
      message: "Couldn't fetch data",
      isError: true
    };
  }
};
