import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import { NextResponse, NextRequest } from 'next/server';
import { readContractData } from '@/services';
import { CHAIN_HELPER, TOKENS } from '@/data';
import { LENSPOST_721 } from '@/contracts';
import { encodeFunctionData } from 'viem';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let value: any;
  let data: any;

  const contractAddress = req.nextUrl.searchParams.get('contractAddress');
  const chainId = req.nextUrl.searchParams.get('chainId');

  const { pricePerToken, tokenAddress, isError, message } =
    await readContractData(
      contractAddress as `0x${string}`,
      'claimCondition',
      CHAIN_HELPER[Number(chainId) as keyof typeof CHAIN_HELPER]?.id,
      LENSPOST_721?.abi
    );

  data = encodeFunctionData({
    args: [contractAddress, pricePerToken],
    abi: TOKENS?.[tokenAddress]?.abi,
    functionName: 'approve'
  });

  const txData: FrameTransactionResponse = {
    params: {
      to: tokenAddress as any,
      value: value,
      abi: [],
      data
    },
    method: 'eth_sendTransaction',
    chainId: `eip155:${chainId}`
  };

  return NextResponse.json(txData);
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
