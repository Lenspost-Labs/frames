export interface FrameData {
  minters?: {
    minterAddress: string;
    txHash: string;
  }[];
  isGatedCollections?: string | null;
  isGatedChannels?: string | null;
  chainId?: undefined | number;
  contractAddress?: `0x${string}`;
  frameId?: undefined | number;
  creatorSponsored?: boolean;
  imageUrl?: string | any;
  message?: string | any;
  contractType?: string;
  allowedMints?: number;
  redirectLink?: string;
  owner?: `0x${string}`;
  isRecast?: boolean;
  isFollow?: boolean;
  tokenUri?: string;
  isTopUp?: boolean;
  isLike?: boolean;
  slug?: string;
}

export type UserCanvasData = {
  imageURL?: string;
  userId?: string;
  slug?: string;
};

export interface MintFrameData {
  message?: string | any;
  tx?: string;
}

export interface UpdateFrameData {
  message?: string | any;
  status?: string;
}
