import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import {
  LENSPOST_ETH_ADDRESS,
  CREATORS_REWARD_FEE,
  NEYNAR_API_KEY
} from '@/data';
import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { erc721DropABI } from '@zoralabs/zora-721-contracts';
import { NextResponse, NextRequest } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { readContractData } from '@/services';
import { LENSPOST_721 } from '@/contracts';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let accountAddress: `0x${string}`;
  let quantity: any;
  let value: any;
  let data: any;

  const mintFee = parseEther(CREATORS_REWARD_FEE);
  const mintReferral = LENSPOST_ETH_ADDRESS;
  const comment = '';

  const contractAddress = req.nextUrl.searchParams.get('contractAddress');
  const chainId = req.nextUrl.searchParams.get('chainId');

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: NEYNAR_API_KEY
  });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  accountAddress = message.interactor.verified_accounts[0] as `0x${string}`;

  if (message?.input === undefined || message?.input === '0') {
    quantity = 1n;
  } else {
    quantity = BigInt(`${message?.input}`);
  }

  const { currencyAddress, pricePerToken } = await readContractData(
    contractAddress as `0x${string}`,
    'claimCondition',
    LENSPOST_721?.abi
  );

  if (chainId === '666666666') {
    data = encodeFunctionData({
      args: [
        accountAddress,
        quantity,
        currencyAddress,
        pricePerToken,
        [[], 400, pricePerToken, currencyAddress],
        '0x'
      ],
      abi: LENSPOST_721?.abi,
      functionName: 'claim'
    });
  } else {
    data = encodeFunctionData({
      args: [accountAddress, quantity, comment, mintReferral],
      functionName: 'mintWithRewards',
      abi: erc721DropABI
    });
    value = (mintFee * quantity).toString();
  }

  const txData: FrameTransactionResponse = {
    params: {
      to: contractAddress as any,
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
