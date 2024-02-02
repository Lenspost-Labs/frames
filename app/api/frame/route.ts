import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import abi from "../../../abi.json";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
// import lighthouse from "@lighthouse-web3/sdk";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";
  let status: any;

  const searchParams = req.nextUrl.searchParams;
  const imageUrl = searchParams.get("image") || "";
  const tokenUri = searchParams.get("tokenUri") || "";

  console.log("imageUrl-> ", imageUrl);
  console.log("tokenUri-> ", tokenUri);

  console.log("req.body-> ", req.body);

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY || "",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    status = 400;
    return new NextResponse("Invalid request", { status });
  }

  console.log("Extracted address from FID-> ", accountAddress);
  console.log("frame message-> ", message);

  // redirect to Lenspost --> (redirect url should be same as host url)
  if (message?.button === 2) {
    console.log("redirecting to Lenspost");
    return NextResponse.redirect(
      "https://test-frame-app6.vercel.app/redirect",
      {
        status: 302,
      }
    );
  }

  // check if post is liked | recasted | following
  // if (!message?.liked || !message?.recasted || !message?.following) {
  //   console.log("User didn't like or recasted or following");
  //   return new NextResponse(`User didn't like or recast or follow the post`);
  // }

  try {
    // ----- NFT minting logic goes here -----

    // Once your contract is registered, you can mint an NFT using the following code
    const syndicateRes = await fetch("https://frame.syndicate.io/api/mint", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.SYNDICATE_FRAME_API_KEY,
      },
      body: JSON.stringify({
        frameTrustedData: body?.trustedData?.messageBytes,
      }),
    });

    console.log("Syndicate response:", syndicateRes);
    console.log("Sending confirmation as Farcaster Frame response");

    btnText = "Mint Again";

    return new NextResponse(`
        <!DOCTYPE html><html><head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${btnText}" />
        <meta property="fc:frame:button:2" content="Check Lenspost" />
        <meta property="fc:frame:button:2:action" content="post_redirect">
      </head></html>
        `);
  } catch (error) {
    console.log("Error minting NFT-> ", error);
    btnText = "Try Again";
    return new NextResponse(`
    <!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="${btnText}" />
    <meta property="fc:frame:post_url" content="none">
  </head></html>
    `);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

//  ----- upload to IPFS -----

// get the image blob
// const getImageBlob = async (imageUrl: string) => {
//   const response = await fetch(imageUrl);
//   const arrayBuffer = await response.arrayBuffer();
//   const blob = Buffer.from(arrayBuffer);

//   return blob;
// };

// upload image to IPFS
// const uploadMediaToIpfs = async (imageUrl: string) => {
//   const blobImage = await getImageBlob(imageUrl);
//   console.log("imageUrl-> ", blobImage);

//   try {
//     const result = await lighthouse.uploadBuffer(
//       blobImage,
//       process.env.LIGHTHOUSE_API_KEY || ""
//     );

//     console.log("result-> ", result?.data);

//     return result.data.Hash;
//   } catch (error) {
//     console.log("Error uploading image to IPFS-> ", error);
//   }
// };

// upload metadata (JSON text) to IPFS
// const uploadMetadata = async (imageUrl: string) => {
//   const imageHash = await uploadMediaToIpfs(imageUrl);
//   console.log("imageHash-> ", imageHash);

//   try {
//     const metadata = {
//       name: "my NFT",
//       description: "my NFT description",
//       image: `ipfs://${imageHash}`,
//     };

//     let { data } = await lighthouse.uploadText(
//       JSON.stringify(metadata),
//       process.env.LIGHTHOUSE_API_KEY || ""
//     );

//     console.log("uploadMetadata-> ", data);

//     return data.Hash;
//   } catch (error) {
//     console.log("Error uploading metadata to IPFS-> ", error);
//   }
// };

//  ----- upload to IPFS -----
