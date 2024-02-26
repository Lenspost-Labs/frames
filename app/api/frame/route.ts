import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import { config } from "@/config/config";
import axios from "axios";
import { getFrame, getFrameData, mintFrame, updateFrameData } from "@/utils";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";
  let txHash: string | undefined = "";

  const searchParams = req.nextUrl.searchParams;
  const frameIdParam = searchParams.get("frameId") || "";

  // get frame data
  const getFrameDataRes = await getFrameData(frameIdParam);

  const {
    frameId,
    imageUrl,
    tokenUri,
    minters,
    owner,
    isTopUp,
    allowedMints,
    isLike,
    isRecast,
    isFollow,
    redirectLink,
    noOfNftsMinited,
  } = getFrameDataRes;

  if (!frameId) {
    btnText = "FrameId not found";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  console.log("quries-> ", {
    imageUrl,
    tokenUri,
    minters,
    owner,
    isTopUp,
    allowedMints,
    isLike,
    isRecast,
    isFollow,
    redirectLink,
    noOfNftsMinited,
  });

  console.log("req.body-> ", req.body);

  // get frame request data from Farcaster client
  const body: FrameRequest = await req.json();

  console.log("frame request-> ", body);

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config?.neynar?.apiKey,
  });

  console.log("frame message-> ", message);

  // get user's wallet address from FID
  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    btnText = "No Wallet Found";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  console.log("Extracted address from FID-> ", accountAddress);

  // check if user has already minted
  const minter = minters?.find((m) => m?.minterAddress === accountAddress);
  if (minter) {
    console.log("User has already minted-> ", minter);
    btnText = "Already Minted";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  // check if mint has exceeded
  if (noOfNftsMinited >= allowedMints) {
    console.log("Mint has exceeded");
    btnText = `Mint has exceeded ${minters?.length}/${allowedMints}`;
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  // check if this is a old frame frameId < 114
  if (frameId && frameId < 114) {
    console.log("Old frame is not mintable");
    btnText = "Old Frame is not mintable";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  // check gate with like
  if (isLike) {
    if (message?.liked) {
      console.log("User liked the post");
    } else {
      console.log("User didn't like the post");
      btnText = "Like and Mint";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText)
      );
    }
  }

  // check gate with recast
  if (isRecast) {
    if (message?.recasted) {
      console.log("User recasted the post");
    } else {
      console.log("User didn't recast the post");
      btnText = "Recast and Mint";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText)
      );
    }
  }

  // check gate with follow
  if (isFollow) {
    if (message?.following) {
      console.log("User followed the post");
    } else {
      console.log("User didn't follow the post");
      btnText = "Follow and Mint";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText)
      );
    }
  }

  // mint NFT
  const mintFrameRes = await mintFrame(frameId.toString(), accountAddress);

  if (!mintFrameRes?.tx) {
    btnText = "Error minting NFT";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  if (mintFrameRes?.tx?.startsWith("0x")) {
    txHash = mintFrameRes?.tx;

    btnText = "View tx";

    console.log("NFT minted successfully!", txHash);

    // update frame data with txHash and minterAddress
    if (txHash) {
      const updateFrameDataRes = await updateFrameData(
        frameId.toString(),
        accountAddress,
        txHash
      );
      console.log("Frame data updated-> ", updateFrameDataRes.status);
    }

    return new NextResponse(
      getFrame(accountAddress, txHash, imageUrl, btnText)
    );
  } else {
    btnText = "Gas not enough";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
