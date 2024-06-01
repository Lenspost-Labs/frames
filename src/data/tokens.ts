import { WDEGEN, DEGEN, DOG } from '@/contracts';

const WDEGEN_ABI = WDEGEN?.abi;
const DEGEN_ABI = DEGEN?.abi;
const DOG_ABI = DOG?.abi;

export const TOKENS: any = {
  '0xeb54dacb4c2ccb64f8074eceea33b5ebb38e5387': {
    chainId: 666666666,
    abi: WDEGEN_ABI,
    symbol: 'DEGEN',
    name: 'Degen',
    decimals: 18
  },
  '0xAfb89a09D82FBDE58f18Ac6437B3fC81724e4dF6': {
    name: 'The Doge NFT',
    symbol: 'DOG',
    chainId: 8453,
    abi: DOG_ABI,
    decimals: 18
  },
  '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed': {
    symbol: 'DEGEN',
    abi: DEGEN_ABI,
    chainId: 8453,
    name: 'Degen',
    decimals: 18
  }
};
