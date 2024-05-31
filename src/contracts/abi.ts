import { WDEGEN, DEGEN } from '.';

const wrappedDegenContract = WDEGEN?.contractAddress;
const degenContract = DEGEN?.contractAddress;

const wrappedDegenABI = WDEGEN?.abi;
const degenABI = DEGEN?.abi;

export const ABI = {
  wrappedDegenContract: wrappedDegenABI,
  degenContract: degenABI
};
