import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const appUrl = 'https://frontend-ca4b98j70-raveshare.vercel.app';

  const body: FrameRequest = await req.json();
  const messageBytes = body?.trustedData?.messageBytes;
  const url = decodeURIComponent(
    appUrl + `/?actionType=composer&fc-auth=FC ${messageBytes}`
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
