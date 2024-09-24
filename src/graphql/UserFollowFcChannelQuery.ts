import { gql } from '@apollo/client'; // or whatever GraphQL client you're using

export const userFollowFcChannelQuery = gql`
  query MyQuery($fid: Identity!, $channelId: String!) {
    FarcasterChannelParticipants(
      input: {
        filter: {
          participant: { _eq: $fid }
          channelId: { _eq: $channelId }
          channelActions: { _eq: follow }
        }
        blockchain: ALL
      }
    ) {
      FarcasterChannelParticipant {
        lastActionTimestamp
      }
    }
  }
`;
