import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import abi from "../../../abi.json";

// Based on https://github.com/coinbase/build-onchain-apps/blob/b0afac264799caa2f64d437125940aa674bf20a2/template/app/api/frame/route.ts#L13
async function getAddrByFid(fid: number) {
  console.log("Extracting address for FID: ", fid);
  const options = {
    method: "GET",
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR_API_KEY || "",
    },
  };
  console.log("Fetching user address from Neynar API");
  const resp = await fetch(options.url, { headers: options.headers });
  console.log("Response: ", resp);
  const responseBody = await resp.json(); // Parse the response body as JSON

  if (responseBody.users) {
    const userVerifications = responseBody.users[0];

    if (userVerifications.verifications) {
      console.log(
        "User address from Neynar API: ",
        userVerifications.verifications[0]
      );
      return userVerifications.verifications[0].toString();
      // 0x855c4e93109fecaf0bc139aa6d4328b485caca09
    }
  }
  console.log("Could not fetch user address from Neynar API for FID: ", fid);
  return "0x0000000000000000000000000000000000000000";
}

async function postResponse(req: NextRequest): Promise<NextResponse> {
  let btnText;

  const searchParams = req.nextUrl.searchParams;
  const imageUrl = searchParams.get("image") || "";
  const tokenUri = searchParams.get("tokenUri") || "";

  console.log("req.body-> ", req.body);

  // @ts-ignore
  const fid = req?.body?.untrustedData?.fid;
  const addressFromFid = await getAddrByFid(fid);

  if (!addressFromFid) {
    btnText = "Could not find user address";
    return new NextResponse(`
        <!DOCTYPE html><html><head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${btnText}" />
      </head></html>`);
  }

  console.log("Extracted address from FID-> ", addressFromFid);

  try {
    // ----- NFT minting logic goes here -----

    // Wallet private key
    const privateKey = process.env.WALLET_PRIVATE_KEY || "";

    // Contract address
    const contractAddress = "0x364fEa7309c2364453C01Adcba2058BAF9747A13";

    // Network provider (e.g., Infura)
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.infura.io/v3/204efb1ccc384775857ef27ec34795e8"
    );

    // Wallet instance
    const wallet = new ethers.Wallet(privateKey, provider);

    // Contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Address to mint the NFT to
    const toAddress = addressFromFid;

    // Token URI
    const tokenURI = tokenUri;

    // Mint NFT
    const tx = await contract.mint(toAddress, tokenURI);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("NFT minted successfully!", tx);

    btnText = "NFT minted successfully!";

    return new NextResponse(`
        <!DOCTYPE html><html><head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${btnText}" />
      </head></html>
        `);
  } catch (error) {
    console.log("Error minting NFT-> ", error);
    btnText = "Error minting NFT";
    return new NextResponse(`
    <!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="${btnText}" />
  </head></html>
    `);
  }
}

// export async function POST(req: NextRequest): Promise<Response> {
//   return postResponse(req);
// }

export async function POST(req: NextRequest): Promise<Response> {
  let btnText = "Mint";
  const APP_URL = "https://frames-lenspost.vercel.app";

  const searchParams = req.nextUrl.searchParams;
  const imageUrl =
    searchParams.get("image") ||
    "https://frames-lenspost.vercel.app/api/frame?image=https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&tokenUri=%22wow";
  const tokenUri = searchParams.get("tokenUri") || "";

  return new NextResponse(`
    <!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="${btnText}" />
    <meta name="fc:frame:post_url" content="${APP_URL}/api/frame?image=${imageUrl}&tokenUri=${tokenUri}" />
  </head></html>
    `);
}

export const dynamic = "force-dynamic";
