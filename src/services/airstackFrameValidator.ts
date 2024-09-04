import { AIRSTACK_API_KEY, AIRSTACK_API } from '@/data';
import { airstackFrameValidatorQuery } from '@/graphql';
import { AirstackFrameValidatorOutput } from '@/types';
import request from 'graphql-request';

export const airstackFrameValidator = async (messageBytes: string) => {
  const variables = {
    messageBytes: messageBytes
  };

  try {
    const result: AirstackFrameValidatorOutput = await request(
      AIRSTACK_API,
      airstackFrameValidatorQuery,
      variables,
      {
        headers: {
          'x-api-key': AIRSTACK_API_KEY
        }
      } as unknown as HeadersInit
    );

    console.log({
      profileName:
        result?.FarcasterValidateFrameMessage?.interactedBy?.profileName,
      message: result?.FarcasterValidateFrameMessage?.message,
      result
    });
  } catch (error) {
    console.log(error);
  }
};
