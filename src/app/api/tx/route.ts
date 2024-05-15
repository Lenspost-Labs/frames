import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { LENSPOST_ETH_ADDRESS, CREATORS_REWARD_FEE } from '@/data';
import { erc721DropABI } from '@zoralabs/zora-721-contracts';
import { NextResponse, NextRequest } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { base } from 'viem/chains';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  let accountAddress: `0x${string}`;
  let quantity: any;

  const mintFee = parseEther(CREATORS_REWARD_FEE);
  const mintReferral = LENSPOST_ETH_ADDRESS;
  const comment = '';

  const contractAddress =
    req.nextUrl.searchParams.get('contract_address') || '';
  const contractType = req.nextUrl.searchParams.get('contract_type') || '';
  const chainId = req.nextUrl.searchParams.get('chainId') || base.id;

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY
  });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  accountAddress = message.interactor.verified_accounts[0] as any;

  if (message?.input === undefined || message?.input === '0') {
    quantity = 1n;
  } else {
    quantity = BigInt(`${message?.input}`);
  }

  if (contractType === 'ERC721') {
    const data = encodeFunctionData({
      args: [accountAddress, quantity, comment, mintReferral],
      functionName: 'mintWithRewards',
      abi: erc721DropABI
    });

    const txData: FrameTransactionResponse = {
      params: {
        value: (mintFee * quantity).toString(),
        to: contractAddress as any,
        abi: [],
        data
      },
      method: 'eth_sendTransaction',
      chainId: `eip155:${chainId}`
    };

    return NextResponse.json(txData);
  }

  return NextResponse.json('Invalid contract type');
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
