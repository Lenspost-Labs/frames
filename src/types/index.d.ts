export interface FrameData {
  minters?: {
    minterAddress: string;
    txHash: string;
  }[];
  isGatedCollections?: string | null;
  isGatedChannels?: string | null;
  contractAddress?: `0x${string}`;
  frameId?: undefined | number;
  chainId?: undefined | number;
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
  isError?: boolean;
  isLike?: boolean;
  slug?: string;
}

export interface ContractData {
  quantityLimitPerWallet?: any;
  maxClaimableSupply?: any;
  currencyAddress?: any;
  startTimestamp?: any;
  pricePerToken?: any;
  supplyClaimed?: any;
  isError?: boolean;
  merkleRoot?: any;
  message?: string;
  metadata?: any;
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
