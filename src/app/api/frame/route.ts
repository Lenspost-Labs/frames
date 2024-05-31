import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest
} from '@coinbase/onchainkit';
import {
  readContractData,
  updateFrameData,
  getFrameData,
  mintFrame
} from '@/services';
import { ZERO_ADDRESS, CHAIN_HELPER, APP_URL } from '@/data';
import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_721 } from '@/contracts';
import { getFrameUI } from '@/utils';

const handler = async (req: NextRequest): Promise<NextResponse> => {
  let accountAddress: undefined | string = '';
  let isLenspost721Contract: boolean = false;
  let btnText: undefined | string = '';
  let txHash: undefined | string = '';

  const frameIdParam = req.nextUrl.searchParams.get('frameId') || '';
  const getFrameDataRes = await getFrameData(frameIdParam);

  const {
    creatorSponsored,
    contractAddress,
    contractType,
    allowedMints,
    redirectLink,
    isRecast,
    isFollow,
    imageUrl,
    frameId,
    chainId,
    minters,
    isLike
  } = getFrameDataRes;
  const noOfNftsMinited = minters?.length || 0;

  if (!frameId) {
    btnText = 'FrameId not found';
    return new NextResponse(getFrameUI(false, redirectLink, imageUrl, btnText));
  }

  const {
    currencyAddress,
    message: errMsg,
    isError
  } = await readContractData(
    contractAddress as `0x${string}`,
    'claimCondition',
    CHAIN_HELPER[Number(chainId) as keyof typeof CHAIN_HELPER]?.id,
    LENSPOST_721?.abi
  );

  if (currencyAddress && currencyAddress !== ZERO_ADDRESS) {
    isLenspost721Contract = true;
  }

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    btnText = 'No Wallet Found';
    return new NextResponse(getFrameUI(false, redirectLink, imageUrl, btnText));
  }

  // const minter = minters?.find((m) => m?.minterAddress === accountAddress);
  // if (minter) {
  //   btnText = 'Already Minted';
  //   return new NextResponse(getFrameUI(false, redirectLink, imageUrl, btnText));
  // }

  // if (noOfNftsMinited >= (allowedMints ?? 0)) {
  //   btnText = `Mint sold out ${minters?.length}/${allowedMints}`;
  //   return new NextResponse(getFrameUI(false, redirectLink, imageUrl, btnText));
  // }

  if (isLike) {
    if (message?.liked) {
    } else {
      btnText = 'Like and Mint';
      return new NextResponse(
        getFrameUI(false, redirectLink, imageUrl, btnText)
      );
    }
  }

  if (isRecast) {
    if (message?.recasted) {
    } else {
      btnText = 'Recast and Mint';
      return new NextResponse(
        getFrameUI(false, redirectLink, imageUrl, btnText)
      );
    }
  }

  if (isFollow) {
    if (message?.following) {
    } else {
      btnText = 'Follow and Mint';
      return new NextResponse(
        getFrameUI(false, redirectLink, imageUrl, btnText)
      );
    }
  }

  if (creatorSponsored) {
    const mintFrameRes = await mintFrame(frameId.toString(), accountAddress);

    if (!mintFrameRes?.tx) {
      btnText = mintFrameRes?.message;
      return new NextResponse(
        getFrameUI(false, redirectLink, imageUrl, btnText)
      );
    }

    if (mintFrameRes?.tx?.startsWith('0x')) {
      txHash = mintFrameRes?.tx;

      btnText = 'View tx';

      if (txHash) {
        await updateFrameData(frameId.toString(), accountAddress, txHash);
      }

      return new NextResponse(
        getFrameUI(txHash, redirectLink, imageUrl, btnText)
      );
    } else {
      btnText = mintFrameRes?.message;
      return new NextResponse(
        getFrameUI(false, redirectLink, imageUrl, btnText)
      );
    }
  } else if (isLenspost721Contract) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            postUrl: `${APP_URL}/api/tx-approval/success?accountAddress=${accountAddress}&contractAddress=${contractAddress}&chainId=${chainId}&frameId=${frameId}`,
            target: `${APP_URL}/api/tx-approval/approve?contractAddress=${contractAddress}&chainId=${chainId}`,
            label: 'Connect wallet & approve token allowance',
            action: 'tx'
          }
        ],
        image: {
          aspectRatio: '1:1',
          src: imageUrl
        }
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            postUrl: `${APP_URL}/api/tx/success?accountAddress=${accountAddress}&chainId=${chainId}&frameId=${frameId}`,
            target: `${APP_URL}/api/tx/mint?contractAddress=${contractAddress}&chainId=${chainId}`,
            label: 'Connect wallet & Mint',
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
  }
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return handler(req);
};

export const dynamic = 'force-dynamic';
