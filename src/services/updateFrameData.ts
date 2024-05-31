import { BACKEND_ENDPOINT } from '@/data';
import { UpdateFrameData } from '@/types';

export const updateFrameData = async (
  frameId: string,
  minterAddress: string,
  txHash: string
): Promise<UpdateFrameData> => {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/util/update-frame-data`, {
      body: JSON.stringify({
        minterAddress,
        frameId,
        txHash
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
        status: data?.status
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText,
        isError: true
      };
    }
  } catch (error) {
    return {
      message: "Couldn't update frame data",
      isError: true
    };
  }
};
