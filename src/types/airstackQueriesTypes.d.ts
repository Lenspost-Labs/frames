export interface AirstackFrameValidatorOutput {
  FarcasterValidateFrameMessage: {
    message: {
      data: {
        frameActionBody: {
          castId: {
            hash: string;
            fid: number;
          };
          buttonIndex: number;
          inputText: string;
          address: string;
          state: string;
        };
        fid: number;
      };
    };
    interactedBy: {
      userAssociatedAddresses: [string];
      profileName: string;
    };
    castedBy: {
      profileName: string;
    };
    interactedByFid: number;
    castedByFid: number;
    isValid: boolean;
  };
}

export interface UserFollowFcChannelOutput {
  FarcasterChannelParticipants: {
    FarcasterChannelParticipant: [{ lastActionTimestamp: string }];
  };
}
