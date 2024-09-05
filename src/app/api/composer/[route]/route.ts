import { ComposerActionFormResponse, ComposerActionMetadata } from '@/types';
import { LENSPOST_APP_URL, NEYNAR_API_KEY, APP_URL } from '@/data';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
import { airstackFrameValidator } from '@/services';

if (!NEYNAR_API_KEY) {
  throw new Error('NEYNAR_API_KEY is not set in environment variables');
}

const handlePostRequest = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body: FrameRequest = await req.json();

    const { interactorAddress, interactorFid, isValid } =
      await airstackFrameValidator(body?.trustedData?.messageBytes);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid frame message' },
        { status: 400 }
      );
    }

    const messageBytes = body?.trustedData?.messageBytes;
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
  const composerActionMetadata: ComposerActionMetadata = {
    imageUrl: new URL('/logo-rounded-trans-bg.png', APP_URL).toString(),
    aboutUrl: new URL('/about', APP_URL).toString(),
    description: 'Make AI poster memes',
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
