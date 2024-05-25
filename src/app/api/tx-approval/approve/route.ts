import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_721, WDEGEN } from '@/contracts';
import { readContractData } from '@/services';
import { encodeFunctionData } from 'viem';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let value: any;
  let data: any;

  const contractAddress = req.nextUrl.searchParams.get('contractAddress');
  const chainId = req.nextUrl.searchParams.get('chainId');

  const { currencyAddress, pricePerToken } = await readContractData(
    contractAddress as `0x${string}`,
    'claimCondition',
    LENSPOST_721?.abi
  );

  data = encodeFunctionData({
    args: [contractAddress, pricePerToken],
    functionName: 'approve',
    abi: WDEGEN?.abi
  });

  const txData: FrameTransactionResponse = {
    params: {
      to: currencyAddress as any,
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
