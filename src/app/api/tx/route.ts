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
import { DEGEN_CHAIN } from '@/contracts';
import { readContractData } from '@/services';
import { readContract } from '@wagmi/core';
import { config } from '@/config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let currenyAddress: `0x${string}` = '0x0';
  let accountAddress: `0x${string}`;
  let quantity: any;
  let value: any;
  let data: any;

  const mintFee = parseEther(CREATORS_REWARD_FEE);
  const mintReferral = LENSPOST_ETH_ADDRESS;
  const comment = '';

  const contractAddress = req.nextUrl.searchParams.get('contractAddress') || '';
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

  // const result = await readContract(config, {
  //   address: contractAddress as `0x${string}`,
  //   functionName: 'claimCondition',
  //   abi: DEGEN_CHAIN?.abi
  // });

  // console.log(result);

  // const contractData = await readContractData(
  //   contractAddress as `0x${string}`,
  //   'claimCondition',
  //   DEGEN_CHAIN?.abi
  // );

  // if (contractData?.isError) {
  //   return new NextResponse('Error reading contract data', { status: 500 });
  // }

  if (chainId === '666666666') {
    data = encodeFunctionData({
      args: [
        accountAddress,
        1n,
        '0x5A8e4e0dD630395B5AFB8D3ac5b3eF269f0c8356',
        1n,
        [[], 0, 0, '0x0000000000000000000000000000000000000000'],
        '0x'
      ],
      functionName: 'claim',
      abi: DEGEN_CHAIN?.abi
    });
    value = parseEther('0').toString();
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
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
