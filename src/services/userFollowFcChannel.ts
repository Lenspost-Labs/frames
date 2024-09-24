import { AIRSTACK_API_KEY, AIRSTACK_API_URL } from '@/data';
import { userFollowFcChannelQuery } from '@/graphql';
import { UserFollowFcChannelOutput } from '@/types';
import { request } from 'graphql-request';

export const userFollowFcChannel = async (fid: string, channelId: string) => {
  const variables = {
    channelId: channelId,
    fid: `fc_fid:${fid}`
  };

  if (!AIRSTACK_API_KEY) throw new Error('AIRSTACK_API_KEY not set');

  const headers = {
    Authorization: AIRSTACK_API_KEY
  };

  try {
    const result: UserFollowFcChannelOutput = await request(
      AIRSTACK_API_URL,
      userFollowFcChannelQuery,
      variables,
      headers
    );

    const lastActionTimestamp =
      result?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.[0]
        ?.lastActionTimestamp;

    const isChannelFollow = lastActionTimestamp != null;

    return isChannelFollow;
  } catch (error) {
    console.error('Error occurred:', error);
    throw new Error('Something went wrong', { cause: error });
  }
};
