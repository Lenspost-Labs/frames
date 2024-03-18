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
}

export interface MintFrameData {
  tx: string;
  message: string;
}

export interface UpdateFrameData {
  status: string;
  message: string;
}
