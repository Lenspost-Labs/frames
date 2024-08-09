import { BACKEND_ENDPOINT } from '@/data';
import { BlinkData } from '@/types';

export const getBlinkData = async (blinkId: string): Promise<BlinkData> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/util/get-blink-data?blinkId=${blinkId}`,
      {
        next: {
          revalidate: 60
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        royalty: data.sellerFeeBasisPoints,
        description: data.content,
        message: data.message,
        creator: data.creator,
        imageUrl: data.image,
        symbol: data.symbol,
        owner: data.owner,
        title: data.name,
        blinkId: data.id,
        isError: false
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
