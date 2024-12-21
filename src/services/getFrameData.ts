import { BACKEND_ENDPOINT, CDN_IMAGE_URL, R2_IMAGE_URL } from '@/data';
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
        imageUrl: data?.imageUrl?.replace(R2_IMAGE_URL, CDN_IMAGE_URL),
        gatedCollections: data?.gatedCollections,
        creatorSponsored: data?.creatorSponsored,
        contractAddress: data?.contract_address,
        gatedChannels: data?.gatedChannels,
        contractType: data?.contract_type,
        redirectLink: data?.redirectLink,
        allowedMints: data?.allowedMints,
        isRecast: data?.isRecast,
        isFollow: data?.isFollow,
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
    console.error(error);
    return {
      message: "Couldn't fetch data",
      isError: true
    };
  }
};
