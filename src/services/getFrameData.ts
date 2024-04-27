import { BACKEND_ENDPOINT } from '@/data';
import { FrameData } from '@/types';

export const getFrameData = async (frameId: string): Promise<FrameData> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/util/get-frame-data?frameId=${frameId}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return {
        isGatedCollections: data?.gatedCollections,
        contractAddress: data?.contract_address,
        creatorSponsored: data?.creatorSponsored,
        isGatedChannels: data?.gatedChannels,
        contractType: data?.contract_type,
        redirectLink: data?.redirectLink,
        allowedMints: data?.allowedMints,
        isRecast: data?.isRecast,
        isFollow: data?.isFollow,
        imageUrl: data?.imageUrl,
        tokenUri: data?.tokenUri,
        minters: data?.minters,
        chainId: data?.chainId,
        frameId: data?.id,
        isTopUp: data?.isTopUp,
        isLike: data?.isLike,
        owner: data?.owner,
        slug: data?.slug
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText
      };
    }
  } catch (error) {
    return {
      message: "Couldn't fetch data"
    };
  }
};
