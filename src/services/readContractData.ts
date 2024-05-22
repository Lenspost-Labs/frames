import { readContract } from '@wagmi/core';
import { config } from '@/config';

export const readContractData = async (
  address: `0x${string}`,
  functionName: string,
  abi: any
) => {
  try {
    const result = await readContract(config, {
      functionName,
      address,
      abi
    });

    console.log(result);
    return {
      currencyAddress: '0x',
      pricePerToken: '0.1'
    };
  } catch (error) {
    return {
      message: "Couldn't fetch data",
      isError: true
    };
  }
};
