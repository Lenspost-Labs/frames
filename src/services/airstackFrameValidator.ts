import { AIRSTACK_API_KEY, AIRSTACK_API_URL } from '@/data';
import { airstackFrameValidatorQuery } from '@/graphql';
import { AirstackFrameValidatorOutput } from '@/types';
import { request } from 'graphql-request';

export const airstackFrameValidator = async (messageBytes: string) => {
  const variables = {
    messageBytes: messageBytes
  };

  if (!AIRSTACK_API_KEY) throw new Error('AIRSTACK_API_KEY not set');

  const headers = {
    Authorization: AIRSTACK_API_KEY
  };

  try {
    const result: AirstackFrameValidatorOutput = await request(
      AIRSTACK_API_URL,
      airstackFrameValidatorQuery,
      variables,
      headers
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
    console.error('Error occurred:', error);
    throw new Error('Something went wrong', { cause: error });
  }
};
