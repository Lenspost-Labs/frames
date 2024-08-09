import { BACKEND_ENDPOINT } from '@/data';
import { MintBlinkData } from '@/types';

export const mintBLink = async (
  blinkId: string,
  recipient: string
): Promise<MintBlinkData> => {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/util/mint-blink`, {
      body: JSON.stringify({
        recipient,
        blinkId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      return {
        status: data?.status,
        tx: data?.tx
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
      message: "Couldn't mint frame",
      isError: true
    };
  }
};
