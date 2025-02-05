import {
  airstackFrameValidator,
  userFollowFcChannel,
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
import { MINT_PAGE_URL, NULL_ADDRESS, CHAIN_HELPER, APP_URL } from '@/data';
import { NextResponse, NextRequest } from 'next/server';
import { campNetworkTestnetV2 } from '@/chains';
import { LENSPOST_721 } from '@/contracts';
import { getFrameUI } from '@/utils';
import { morph } from 'viem/chains';

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
    gatedChannels,
    allowedMints,
    isRecast,
    isFollow,
    imageUrl,
    frameId,
    chainId,
    minters,
    isLike,
    slug
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

  if (tokenAddress && !NULL_ADDRESS?.includes(tokenAddress)) {
    isLenspost721Contract = true;
  }

  const body: FrameRequest = await req.json();

  const {
    isValid: isValidAirstackFrame,
    interactorAddress,
    interactorFid
  } = await airstackFrameValidator(body?.trustedData?.messageBytes);

  console.log({
    isValidAirstackFrame,
    interactorAddress,
    interactorFid
  });

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

  const isChannelFollow =
    gatedChannels &&
    (await userFollowFcChannel(
      interactorFid?.toString(),
      gatedChannels as string
    ));

  const checkConditions = [
    {
      condition: minter && creatorSponsored,
      text: 'Already Minted'
    },
    {
      condition: noOfNftsMinited >= (allowedMints ?? 0),
      // eslint-disable-next-line perfectionist/sort-objects
      text: `Mint sold out ${minters?.length}/${allowedMints}`
    },
    {
      condition: gatedChannels && !isChannelFollow,
      // eslint-disable-next-line perfectionist/sort-objects
      text: `Follow channel ${gatedChannels} and Mint`
    },
    {
      condition: isLike && !message?.liked,
      text: 'Like and Mint'
    },
    {
      condition: isRecast && !message?.recasted,
      text: 'Recast and Mint'
    },
    {
      condition: isFollow && !message?.following,
      text: 'Follow and Mint'
    }
  ];

  for (const { condition, text } of checkConditions) {
    if (condition) {
      return new NextResponse(
        getFrameUI(false, false, imageUrl, text, true, frameId)
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
  } else if (
    (chainId === morph?.id || chainId === campNetworkTestnetV2?.id) &&
    !creatorSponsored
  ) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            target: `${MINT_PAGE_URL}/mint/${slug}`,
            label: 'Mint on Poster',
            action: 'link'
          }
        ],
        image: { aspectRatio: '1:1', src: imageUrl }
      })
    );
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
