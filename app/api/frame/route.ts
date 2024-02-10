import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import { config } from "@/config/config";
import { writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import { base, baseSepolia } from "@wagmi/core/chains";
import { privateKeyToAccount } from "viem/accounts";
import {
  BaseAbi,
  BaseContractAddress,
  TestAbi,
  TestContractAddress,
} from "@/contract";
import axios from "axios";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";
  let imageUrl: string | undefined = "";
  let tokenUri: string | undefined = "";
  let minterAddress: string | undefined = "";
  let txHash: string | undefined = "";
  let isLike: boolean | undefined = false;
  let isRecast: boolean | undefined = false;
  let isFollow: boolean | undefined = false;

  const searchParams = req.nextUrl.searchParams;

  const frameId = searchParams.get("frameId");

  const res = await axios.get(
    `https://api.lenspost.xyz/util/get-frame-data?frameId=${frameId}`
  );

  const data = res.data?.data;

  imageUrl = data?.imageUrl;
  tokenUri = data?.tokenUri;
  minterAddress = data?.minterAddress;
  txHash = data?.txHash;
  isLike = data?.isLike;
  isRecast = data?.isRecast;
  isFollow = data?.isFollow;

  console.log("quries-> ", {
    imageUrl,
    tokenUri,
    minterAddress,
    txHash,
    isLike,
    isRecast,
    isFollow,
  });

  console.log("req.body-> ", req.body);

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config?.neynar?.apiKey,
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse("No wallet found");
  }

  console.log("Extracted address from FID-> ", accountAddress);

  console.log("frame message-> ", message);

  // Gate with Like / Recast / Follow logic

  // if (!message?.liked || !message?.recasted || !message?.following) {
  //   console.log("User didn't like or recasted or following");
  //   return new NextResponse(`User didn't like or recast or follow the post`);
  // }

  if (isLike) {
    if (message?.liked) {
      console.log("User liked the post");
    } else {
      console.log("User didn't like the post");
      return new NextResponse(`User didn't like the post`);
    }
  }

  if (isRecast) {
    if (message?.recasted) {
      console.log("User recasted the post");
    } else {
      console.log("User didn't recast the post");
      return new NextResponse(`User didn't recast the post`);
    }
  }

  if (isFollow) {
    if (message?.following) {
      console.log("User followed the post");
    } else {
      console.log("User didn't follow the post");
      return new NextResponse(`User didn't follow the post`);
    }
  }

  try {
    // NFT minting
    const result = await writeContract(wagmiConfig, {
      abi: TestAbi,
      address: TestContractAddress,
      functionName: "mint",
      args: [accountAddress, tokenUri],
      account: privateKeyToAccount(config?.testWallet),
      chainId: baseSepolia.id,
    });

    console.log("NFT minted successfully!", result);

    if (result) {
      const res = await axios.post(
        `https://api.lenspost.xyz/util/update-frame-data`,
        {
          frameId: frameId,
          minterAddress: accountAddress,
          txHash: result,
        }
      );
      console.log("Frame data updated-> ", res.data);
    }

    btnText = "View tx";

    return new NextResponse(`
          <!DOCTYPE html><html><head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />

          <meta property="fc:frame:button:1" content="${btnText}" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="${baseSepolia.blockExplorers.default.url}/tx/${result}" />

          <meta property="fc:frame:button:2" content="Remix on Lenspost" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://app.lenspost.xyz" />
        </head>
        </html>
          `);
  } catch (error) {
    console.log("Error minting NFT-> ", error);
    btnText = "Try Again";
    return new NextResponse(`
      <!DOCTYPE html><html><head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${imageUrl}" />
      <meta property="fc:frame:image:aspect_ratio" content="1:1" />

      <meta property="fc:frame:button:1" content="${btnText}" />

      <meta property="fc:frame:button:2" content="Remix on Lenspost" />
      <meta property="fc:frame:button:2:action" content="link" />
      <meta property="fc:frame:button:2:target" content="https://app.lenspost.xyz" />
    </head></html>
      `);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
