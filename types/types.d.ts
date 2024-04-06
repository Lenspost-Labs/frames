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
  redirectLink: string;
  noOfNftsMinited: number;
  contract_address: `0x${string}`;
  contract_type: string;
  creatorSponsored: boolean;
  chainId: `eip155:${string}` | `solana:${string}`;
  slug: string;
  message?: string | any;
}

export type UserCanvasData = {
  userId : string;
  imageURL : string;
  slug: string;
}

export interface MintFrameData {
  tx: string;
  message: string | any;
}

export interface UpdateFrameData {
  status: string;
  message: string | any;
}

export interface ErrorMsg {
  response: {
    data: {
      message: {
        name: string;
      };
      name: string;
    };
    status: number;
    statusText: string;
  };
}
