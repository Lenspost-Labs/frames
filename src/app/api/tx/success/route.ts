import { updateFrameData, getFrameData } from '@/services';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextResponse, NextRequest } from 'next/server';
import { getFrameUI } from '@/utils';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let btnText: undefined | string = '';
  let txHash: undefined | string = '';

  const accountAddress = req.nextUrl.searchParams.get('accountAddress') || '';
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

  if (txHash) {
    await updateFrameData(frameId.toString(), accountAddress, txHash);
  }

  btnText = 'View tx';

  return new NextResponse(
    getFrameUI(txHash, redirectLink, imageUrl, btnText, chainId)
  );
};

export const POST = (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
