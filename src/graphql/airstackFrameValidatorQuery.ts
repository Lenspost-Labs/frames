import { gql } from '@apollo/client';

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
        profileName
      }
      castedByFid
      castedBy {
        profileName
      }
    }
  }
`;
