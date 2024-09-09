import { AIRSTACK_API_KEY, AIRSTACK_API_URL } from '@/data';
import { airstackFrameValidatorQuery } from '@/graphql';
import { AirstackFrameValidatorOutput } from '@/types';
import request from 'graphql-request';

export const airstackFrameValidator = async (messageBytes: string) => {
  const variables = {
    messageBytes: messageBytes
  };

  try {
    const result: AirstackFrameValidatorOutput = await request(
      AIRSTACK_API_URL,
      airstackFrameValidatorQuery,
      variables,
      {
        headers: {
          Authorization: AIRSTACK_API_KEY
        }
      } as unknown as HeadersInit
    );

    const isValid = result?.FarcasterValidateFrameMessage?.isValid;
    const interactorAddress =
      result?.FarcasterValidateFrameMessage?.interactedBy
        ?.userAssociatedAddresses?.[0];
    const interactorFid =
      result?.FarcasterValidateFrameMessage?.message?.data?.fid;

    return {
      interactorAddress,
      interactorFid,
      isValid
    };
  } catch (error) {
    console.log('Error occurred:', error);
    throw new Error('Something went wrong', { cause: error });
  }
};
