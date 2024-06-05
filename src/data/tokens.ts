import { WDEGEN, TN100x, DEGEN, DOG } from '@/contracts';

const WDEGEN_ABI = WDEGEN?.abi;
const TN100x_ABI = TN100x?.abi;
const DEGEN_ABI = DEGEN?.abi;
const DOG_ABI = DOG?.abi;

export const TOKENS: any = {
  '0x5B5dee44552546ECEA05EDeA01DCD7Be7aa6144A': {
    name: 'The Next 100x Memecoin on Base',
    symbol: 'TN100x',
    abi: TN100x_ABI,
    chainId: 8453,
    decimals: 18
  },
  '0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387': {
    name: 'Wrapped Degen',
    chainId: 666666666,
    symbol: 'WDEGEN',
    abi: WDEGEN_ABI,
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
