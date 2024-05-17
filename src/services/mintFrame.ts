import { BACKEND_ENDPOINT } from '@/data';
import { MintFrameData } from '@/types';

export const mintFrame = async (
  frameId: string,
  recipientAddress: string
): Promise<MintFrameData> => {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/mint`, {
      body: JSON.stringify({
        recipientAddress,
        frameId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      return {
        message: data?.message,
        tx: data?.tx
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText,
        isError: true
      };
    }
  } catch (error) {
    return {
      message: "Couldn't mint frame",
      isError: true
    };
  }
};
