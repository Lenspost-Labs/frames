import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { LENSPOST_APP_URL, NEYNAR_API_KEY, APP_URL } from '@/data';
import { NextResponse, NextRequest } from 'next/server';
import { ComposerActionFormResponse } from '@/types';

if (!NEYNAR_API_KEY) {
  throw new Error('NEYNAR_API_KEY is not set in environment variables');
}

const handlePostRequest = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body: FrameRequest = await req.json();

    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: process.env.NEYNAR_API_KEY
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid frame message' },
        { status: 400 }
      );
    }

    const messageBytes = body?.trustedData?.messageBytes;
    const interactorFid = message?.interactor?.fid;
    const interactorAddress = message.interactor.verified_accounts[0];
    const url = new URL(LENSPOST_APP_URL);

    url.searchParams.append('actionType', 'composer');
    url.searchParams.append('fid', interactorFid.toString());
    url.searchParams.append('address', interactorAddress);
    url.searchParams.append('fc-auth', `FC ${messageBytes}`);

    console.log(url.toString());

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
  const frameEmbed: FrameEmbed = {
    button: {
      action: {
        splashImageUrl: 'https://app.poster.fun/logo-trans-bg.svg',
        splashBackgroundColor: '#eeeee4',
        url: 'https://app.poster.fun',
        type: 'launch_frame',
        name: 'Poster.fun'
      },
      title: 'Poster.fun'
    },
    imageUrl: new URL('/logo-rounded-trans-bg.png', APP_URL).toString(),
    version: 'next'
  };

  return NextResponse.json(frameEmbed);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handlePostRequest(req);
}

export async function GET(): Promise<NextResponse> {
  return handleGetRequest();
}

export const dynamic = 'force-dynamic';
