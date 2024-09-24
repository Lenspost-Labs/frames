export * from './airstackQueriesTypes';
export * from './composerTypes';

export interface FrameData {
  minters?: {
    minterAddress: string;
    txHash: string;
  }[];
  gatedCollections?: string | null;
  contractAddress?: `0x${string}`;
  gatedChannels?: string | null;
  chainId?: undefined | number;
  creatorSponsored?: boolean;
  imageUrl?: string | any;
  message?: string | any;
  contractType?: string;
  allowedMints?: number;
  redirectLink?: string;
  owner?: `0x${string}`;
  description?: string;
  isRecast?: boolean;
  isFollow?: boolean;
  tokenUri?: string;
  isTopUp?: boolean;
  isError?: boolean;
  frameId?: number;
  isLike?: boolean;
  title?: string;
  slug?: string;
}

export interface BlinkData {
  imageUrl?: string | any;
  message?: string | any;
  description?: string;
  isError?: boolean;
  royalty?: number;
  blinkId?: number;
  symbol?: string;
  owner?: string;
  title?: string;
  creator?: [];
}

export interface ContractData {
  quantityLimitPerWallet?: any;
  maxClaimableSupply?: any;
  startTimestamp?: any;
  pricePerToken?: any;
  supplyClaimed?: any;
  tokenAddress?: any;
  isError?: boolean;
  merkleRoot?: any;
  message?: string;
  metadata?: any;
}

export interface MintBlinkData {
  message?: string | any;
  isError?: boolean;
  tx?: string | any;
  status?: string;
}

export type UserCanvasData = {
  imageURL?: string;
  userId?: string;
  slug?: string;
};

export interface MintFrameData {
  message?: string | any;
  isError?: boolean;
  tx?: string;
}

export interface UpdateFrameData {
  message?: string | any;
  isError?: boolean;
  status?: string;
}
