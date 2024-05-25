import { getFrameHtmlResponse, FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
import { getFrameData } from '@/services';
import { getFrameUI } from '@/utils';
import { APP_URL } from '@/data';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let btnText: undefined | string = '';
  let txHash: undefined | string = '';

  const contractAddress = req.nextUrl.searchParams.get('contractAddress');
  const accountAddress = req.nextUrl.searchParams.get('accountAddress');
  const frameIdParam = req.nextUrl.searchParams.get('frameId') || '';
  const chainId: any = req.nextUrl.searchParams.get('chainId');

  const getFrameDataRes = await getFrameData(frameIdParam);
  const { redirectLink, imageUrl, frameId } = getFrameDataRes;

  if (!frameId) {
    btnText = 'FrameId not found';
    return new NextResponse(getFrameUI(false, redirectLink, imageUrl, btnText));
  }

  const body: FrameRequest = await req.json();
  txHash = body?.untrustedData?.transactionId;

  btnText = 'View tx';

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          postUrl: `${APP_URL}/api/tx/success?accountAddress=${accountAddress}&chainId=${chainId}&frameId=${frameId}`,
          target: `${APP_URL}/api/tx/mint?contractAddress=${contractAddress}&chainId=${chainId}`,
          label: 'Mint',
          action: 'tx'
        }
      ],
      image: {
        aspectRatio: '1:1',
        src: imageUrl
      },
      input: {
        text: 'NFT quantity to mint'
      }
    })
  );
};

export const POST = (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
