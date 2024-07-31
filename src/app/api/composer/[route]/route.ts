import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
// import { LENSPOST_APP_URL } from '@/data';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const body: FrameRequest = await req.json();
  const messageBytes = body?.trustedData?.messageBytes;
  const url = decodeURIComponent(
    'https://8aa2-103-76-139-15.ngrok-free.app' +
      `/?actionType=composer&fc-auth=FC ${messageBytes}`
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
