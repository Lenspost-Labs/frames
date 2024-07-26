import { NextResponse, NextRequest } from 'next/server';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const appUrl = 'https://41a7-103-76-139-15.ngrok-free.app';

  const actionMetadata = {
    url: appUrl + '/?actionType=composer',
    title: 'Poster.fun',
    type: 'form'
  };

  return NextResponse.json(actionMetadata);
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
