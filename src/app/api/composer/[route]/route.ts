import { ComposerActionFormResponse, ComposerActionMetadata } from '@/types';
import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_APP_URL, APP_URL } from '@/data';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

if (!NEYNAR_API_KEY) {
  throw new Error('NEYNAR_API_KEY is not set in environment variables');
}

const handlePostRequest = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: NEYNAR_API_KEY
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid frame message' },
        { status: 400 }
      );
    }

    const accountAddress = message.interactor.verified_accounts[0] || '';
    const messageBytes = body?.trustedData?.messageBytes;
    const url = new URL(LENSPOST_APP_URL);
    url.searchParams.append('actionType', 'composer');
    url.searchParams.append('address', accountAddress);
    url.searchParams.append('fc-auth', `FC ${messageBytes}`);

    const composerActionFormResponse: ComposerActionFormResponse = {
      title: 'Poster.fun',
      url: url.toString(),
      type: 'form'
    };

    return NextResponse.json(composerActionFormResponse);
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};

const handleGetRequest = async (): Promise<NextResponse> => {
  const composerActionMetadata: ComposerActionMetadata = {
    imageUrl: new URL('/logo-rounded-trans-bg.png', APP_URL).toString(),
    aboutUrl: new URL('/about', APP_URL).toString(),
    description: 'Web3 onchain canvas',
    action: { type: 'post' },
    name: 'Poster.fun',
    type: 'composer',
    icon: 'pencil'
  };

  return NextResponse.json(composerActionMetadata);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handlePostRequest(req);
}

export async function GET(): Promise<NextResponse> {
  return handleGetRequest();
}

export const dynamic = 'force-dynamic';
