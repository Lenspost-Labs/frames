export interface FrameData {
  frameId: number | undefined;
  imageUrl: string;
  tokenUri: string;
  minters: {
    minterAddress: string;
    txHash: string;
  }[];
  owner: string;
  isTopUp: boolean;
  allowedMints: number;
  isLike: boolean;
  isRecast: boolean;
  isFollow: boolean;
  noOfNftsMinited: number;
}

export interface MintFrameData {
  tx: string;
  message: string;
}

export interface UpdateFrameData {
  status: string;
  message: string;
}
