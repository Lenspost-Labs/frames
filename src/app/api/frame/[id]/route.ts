import {
  airstackFrameValidator,
  readContractData,
  updateFrameData,
  getFrameData,
  mintFrame
} from '@/services';
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest
} from '@coinbase/onchainkit/frame';
import { NULL_ADDRESS, CHAIN_HELPER, APP_URL } from '@/data';
import { NextResponse, NextRequest } from 'next/server';
import { LENSPOST_721 } from '@/contracts';
import { getFrameUI } from '@/utils';

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const { id } = ctx.params;
  let accountAddress: undefined | string = '';
  let isLenspost721Contract: boolean = false;
  let btnText: undefined | string = '';
  let txHash: undefined | string = '';

  const getFrameDataRes = await getFrameData(id);

  const {
    creatorSponsored,
    contractAddress,
    allowedMints,
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
    return new NextResponse(
      getFrameUI(false, false, imageUrl, btnText, true, frameId)
    );
  }

  const { tokenAddress } = await readContractData(
    contractAddress as `0x${string}`,
    'claimCondition',
    CHAIN_HELPER[Number(chainId) as keyof typeof CHAIN_HELPER]?.id,
    LENSPOST_721?.abi
  );

  if (tokenAddress && tokenAddress !== NULL_ADDRESS) {
    isLenspost721Contract = true;
  }

  const body: FrameRequest = await req.json();

  airstackFrameValidator(body?.trustedData?.messageBytes);

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    btnText = 'No Wallet Found';
    return new NextResponse(
      getFrameUI(false, false, imageUrl, btnText, true, frameId)
    );
  }

  const minter = minters?.find((m) => m?.minterAddress === accountAddress);
  if (minter && creatorSponsored) {
    btnText = 'Already Minted';
    return new NextResponse(
      getFrameUI(false, false, imageUrl, btnText, true, frameId)
    );
  }

  if (noOfNftsMinited >= (allowedMints ?? 0)) {
    btnText = `Mint sold out ${minters?.length}/${allowedMints}`;
    return new NextResponse(
      getFrameUI(false, false, imageUrl, btnText, true, frameId)
    );
  }

  if (isLike) {
    if (message?.liked) {
    } else {
      btnText = 'Like and Mint';
      return new NextResponse(
        getFrameUI(false, false, imageUrl, btnText, true, frameId)
      );
    }
  }

  if (isRecast) {
    if (message?.recasted) {
    } else {
      btnText = 'Recast and Mint';
      return new NextResponse(
        getFrameUI(false, false, imageUrl, btnText, true, frameId)
      );
    }
  }

  if (isFollow) {
    if (message?.following) {
    } else {
      btnText = 'Follow and Mint';
      return new NextResponse(
        getFrameUI(false, false, imageUrl, btnText, true, frameId)
      );
    }
  }

  if (creatorSponsored) {
    const mintFrameRes = await mintFrame(frameId.toString(), accountAddress);

    if (!mintFrameRes?.tx) {
      btnText = mintFrameRes?.message || 'Error minting';
      return new NextResponse(
        getFrameUI(false, false, imageUrl, btnText, true, frameId)
      );
    }

    if (mintFrameRes?.tx) {
      txHash = mintFrameRes?.tx;

      btnText = 'View tx';

      if (txHash) {
        await updateFrameData(frameId.toString(), accountAddress, txHash);
      }

      return new NextResponse(
        getFrameUI(txHash, chainId, imageUrl, btnText, false, frameId)
      );
    } else {
      btnText = mintFrameRes?.message;
      return new NextResponse(
        getFrameUI(false, false, imageUrl, btnText, true, frameId)
      );
    }
  } else if (isLenspost721Contract) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            postUrl: `${APP_URL}/api/frame/tx-approval/success?accountAddress=${accountAddress}&contractAddress=${contractAddress}&chainId=${chainId}&frameId=${frameId}`,
            target: `${APP_URL}/api/frame/tx-approval/approve?contractAddress=${contractAddress}&chainId=${chainId}`,
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
            postUrl: `${APP_URL}/api/frame/tx/success?accountAddress=${accountAddress}&chainId=${chainId}&frameId=${frameId}`,
            target: `${APP_URL}/api/frame/tx/mint?contractAddress=${contractAddress}&chainId=${chainId}`,
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

export const POST = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
