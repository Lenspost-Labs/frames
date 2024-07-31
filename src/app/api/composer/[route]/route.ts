import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_APP_URL } from '@/data';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let accountAddress: undefined | string = '';

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  const messageBytes = body?.trustedData?.messageBytes;
  const url = decodeURIComponent(
    LENSPOST_APP_URL +
      `/?actionType=composer&address=${accountAddress}&fc-auth=FC ${messageBytes}`
  );

  const actionMetadata = {
    title: 'Poster.fun',
    type: 'form',
    url: url
  };

  return NextResponse.json(actionMetadata);
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
