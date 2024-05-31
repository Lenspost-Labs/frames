import { readContract } from '@wagmi/core';
import { ContractData } from '@/types';
import { config } from '@/config';

export const readContractData = async (
  address: `0x${string}`,
  functionName: string,
  chainId: any,
  abi: any
): Promise<ContractData> => {
  try {
    const result = (await readContract(config, {
      functionName,
      args: [],
      address,
      chainId,
      abi
    })) as any;

    return {
      quantityLimitPerWallet: result[3],
      maxClaimableSupply: result[1],
      currencyAddress: result[6],
      startTimestamp: result[0],
      supplyClaimed: result[2],
      pricePerToken: result[5],
      merkleRoot: result[4],
      metadata: result[7]
    };
  } catch (error) {
    return {
      message: "Couldn't fetch data",
      isError: true
    };
  }
};
