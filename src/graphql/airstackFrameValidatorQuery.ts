import { gql } from 'graphql-request';

export const airstackFrameValidatorQuery = gql`
  query MyQuery($messageBytes: String!) {
    FarcasterValidateFrameMessage(
      input: { filter: { messageBytes: $messageBytes } }
    ) {
      isValid
      message {
        data {
          fid
          frameActionBody {
            buttonIndex
            castId {
              fid
              hash
            }
            inputText
            state
          }
        }
      }
      interactedByFid
      interactedBy {
        userAssociatedAddresses
        profileName
      }
      castedByFid
      castedBy {
        profileName
      }
    }
  }
`;
