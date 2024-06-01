import { WDEGEN, DEGEN } from '@/contracts';

const wrappedDegenABI = WDEGEN?.abi;
const degenABI = DEGEN?.abi;

export const TOKENS: any = {
  '0xeb54dacb4c2ccb64f8074eceea33b5ebb38e5387': {
    abi: wrappedDegenABI,
    chainId: 666666666,
    symbol: 'DEGEN',
    name: 'Degen',
    decimals: 18
  },
  '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed': {
    symbol: 'DEGEN',
    chainId: 8453,
    name: 'Degen',
    abi: degenABI,
    decimals: 18
  }
};
