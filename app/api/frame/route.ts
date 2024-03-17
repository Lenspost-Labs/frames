import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import { config } from "@/config/config";
import axios from "axios";
import { getFrame, getFrameData, mintFrame, updateFrameData } from "@/utils";
import { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { encodeFunctionData, parseEther } from "viem";
import { zoraNftCreatorV1Config } from "@zoralabs/zora-721-contracts";
import { APP_ETH_ADDRESS } from "@/constants";

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
    contract_address,
    contract_type,
    creatorSponsored,
    chainId,
  } = getFrameDataRes;

  if (!frameId) {
    btnText = "FrameId not found";
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  console.log("quries-> ", {
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
    contract_address,
    contract_type,
    creatorSponsored,
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
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  console.log("Extracted address from FID-> ", accountAddress);

  // check if user has already minted
  const minter = minters?.find((m) => m?.minterAddress === accountAddress);
  if (minter) {
    console.log("User has already minted-> ", minter);
    btnText = "Already Minted";
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  // check if mint has exceeded
  if (noOfNftsMinited >= allowedMints) {
    console.log("Mint has exceeded");
    btnText = `Mint has exceeded ${minters?.length}/${allowedMints}`;
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  // check if this is a old frame frameId < 114
  if (frameId && frameId < 114) {
    console.log("Old frame is not mintable");
    btnText = "Old Frame is not mintable";
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  // check gate with like
  if (isLike) {
    if (message?.liked) {
      console.log("User liked the post");
    } else {
      console.log("User didn't like the post");
      btnText = "Like and Mint";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
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
        getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
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
        getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
      );
    }
  }

  // mint NFT

  // check if creatorSponsored
  if (creatorSponsored) {
    // mint by mint api
    const mintFrameRes = await mintFrame(frameId.toString(), accountAddress);

    if (!mintFrameRes?.tx) {
      btnText = "Gas depleted";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
      );
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
        getFrame(accountAddress, txHash, imageUrl, btnText, redirectLink)
      );
    } else {
      btnText = "Gas depleted";
      return new NextResponse(
        getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
      );
    }
  } else {
    // check contract type === "ERC721" or "ERC1155"
    // if (contract_type === "ERC721") {
    //   // mint by Frame onchain transaction
    //   const data = encodeFunctionData({
    //     abi: zoraNftCreatorV1Config?.abi,
    //     functionName: "",
    //     args: [accountAddress, 1, "0x", APP_ETH_ADDRESS],
    //   });

    //   console.log("data-> ", data);

    //   const txData: FrameTransactionResponse = {
    //     chainId: chainId, // Remember Base Sepolia might not work on Warpcast yet
    //     method: "eth_sendTransaction",
    //     params: {
    //       abi: [],
    //       data,
    //       to: "0x8Ca5e648C5dFEfcdDa06d627F4b490B719ccFD98",
    //       value: parseEther("0.00000").toString(), // 0.00004 ETH
    //     },
    //   };

    //   console.log("txData-> ", txData);
    // } else {
    //   //TODO -  contract_type === "ERC1155"
    // }

    btnText = "Gas depleted";
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
