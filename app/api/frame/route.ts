import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import abi from "../../../abi.json";
import { getFrameAccountAddress } from "@coinbase/onchainkit";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";

  const searchParams = req.nextUrl.searchParams;
  const imageSearch = searchParams.get("image") || "";
  const imageUrl = decodeURIComponent(imageSearch);
  const tokenUri = searchParams.get("tokenUri") || "";

  console.log("req.body-> ", req.body);

  // redirect to Lenspost
  if (req.url.includes("?redirect=true")) {
    console.log("redirecting to Lenspost");

    return NextResponse.redirect("https://lenspost.app", {
      status: 302,
    });
  }

  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY || "",
    });
  } catch (err) {
    console.error("Error getting account address: ", err);
    btnText = "Could not find user address";
    return new NextResponse(`
          <!DOCTYPE html><html><head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="fc:frame:button:1" content="${btnText}" />
          <meta name="fc:frame:post_url" content="none">
        </head></html>`);
  }

  console.log("Extracted address from FID-> ", accountAddress);

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
    const toAddress = accountAddress;

    // Token URI
    const tokenURI = tokenUri;

    // Mint NFT
    const tx = await contract.mint(toAddress, tokenURI);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("NFT minted successfully!", tx?.hash);

    btnText = "NFT minted successfully!";

    return new NextResponse(`
        <!DOCTYPE html><html><head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${btnText}" />
        <meta name="fc:frame:button:2:post_redirect" content="Check Lenspost">
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
    <meta name="fc:frame:post_url" content="none">
  </head></html>
    `);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
