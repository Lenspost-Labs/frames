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
  let minters:
    | {
        minterAddress: string;
        txHash: string;
      }[]
    | undefined = [{ minterAddress: "", txHash: "" }];
  let owner: string | undefined = "";
  let isTopUp: boolean | undefined = false;
  let allowedMints: number | undefined = 0;
  let isLike: boolean | undefined = false;
  let isRecast: boolean | undefined = false;
  let isFollow: boolean | undefined = false;

  const searchParams = req.nextUrl.searchParams;
  const frameId = searchParams.get("frameId");

  try {
    const res = await axios.get(
      `${config?.BACKEND_URL}/util/get-frame-data?frameId=${frameId}`
    );

    const data = res.data?.data;

    imageUrl = data?.imageUrl;
    tokenUri = data?.tokenUri;
    minters = data?.minters;
    owner = data?.owner;
    isTopUp = data?.isTopUp;
    allowedMints = data?.allowedMints;
    isLike = data?.isLike;
    isRecast = data?.isRecast;
    isFollow = data?.isFollow;
  } catch (error) {
    console.log("Error getting frame data-> ", error);
    return new NextResponse("Error getting frame data");
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
  });

  console.log("req.body-> ", req.body);

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config?.neynar?.apiKey,
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    btnText = "No Wallet Found";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  console.log("Extracted address from FID-> ", accountAddress);

  console.log("frame message-> ", message);

  // check if user has already minted
  const minter = minters?.find((m) => m?.minterAddress === accountAddress);
  if (minter) {
    console.log("User has already minted-> ", minter);
    btnText = "Already Minted";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  // check if mint has exceeded
  if (allowedMints && minters?.length === allowedMints) {
    console.log("Mint has exceeded");
    btnText = "Mint has exceeded";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }

  // Gate with Like / Recast / Follow logic
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

    btnText = "View tx";

    console.log("NFT minted successfully!", result);

    if (result) {
      const res = await axios.post(
        `${config?.BACKEND_URL}/util/update-frame-data`,
        {
          frameId: frameId,
          minterAddress: accountAddress,
          txHash: result,
        }
      );
      console.log("Frame data updated-> ", res.data);
    }

    return new NextResponse(
      getFrame(accountAddress, result, imageUrl, btnText)
    );
  } catch (error) {
    console.log("Error minting NFT-> ", error);
    btnText = "Error - Try again";
    return new NextResponse(getFrame(accountAddress, false, imageUrl, btnText));
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

// ----------------- Helper functions -----------------

const getFrame = (
  isWallet: string | undefined,
  txHash: string | boolean | undefined,
  imageUrl: string | undefined,
  btnText: string | undefined
) => {
  return `
 <!DOCTYPE html><html><head>
 <meta property="fc:frame" content="vNext" />
 <meta property="fc:frame:image" content="${imageUrl}" />
 <meta property="fc:frame:image:aspect_ratio" content="1:1" />

 ${
   txHash
     ? `<meta property="fc:frame:button:1" content="${btnText}" />
       <meta property="fc:frame:button:1:action" content="link" />
       <meta property="fc:frame:button:1:target" content="${base.blockExplorers.default.url}/tx/${txHash}" />`
     : `<meta property="fc:frame:button:1" content="${btnText}" />`
 }

 ${!isWallet && `<meta property="fc:frame:button:1" content="${btnText}" />`}



 <meta property="fc:frame:button:2" content="Remix on Lenspost" />
 <meta property="fc:frame:button:2:action" content="link" />
 <meta property="fc:frame:button:2:target" content="https://app.lenspost.xyz" />
</head>
</html>
 `;
};

// ----------------- Helper functions -----------------
