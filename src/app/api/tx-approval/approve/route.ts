import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_721, WDEGEN } from '@/contracts';
import { readContractData } from '@/services';
import { encodeFunctionData } from 'viem';
import { CHAIN_HELPER } from '@/data';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let value: any;
  let data: any;

  const contractAddress = req.nextUrl.searchParams.get('contractAddress');
  const chainId = req.nextUrl.searchParams.get('chainId');

  const { currencyAddress, pricePerToken, isError, message } =
    await readContractData(
      contractAddress as `0x${string}`,
      'claimCondition',
      CHAIN_HELPER[Number(chainId) as keyof typeof CHAIN_HELPER]?.id,
      LENSPOST_721?.abi
    );

  if (isError) {
    return new NextResponse(message, { status: 500 });
  }

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
