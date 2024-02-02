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
  const imageSearch = searchParams.get("image") || "";
  const imageUrl =
    "https://lenspost.s3.ap-south-1.amazonaws.com/user/58/canvases/19242-0.png";

  const tokenUriSearch = searchParams.get("tokenUri") || "";
  const tokenUri =
    "ipfs://QmbFk3Tcnf5WhybqLvhGodf3naru3bFtHudSbBuzAwqxLy/on-chain-cow-happy-cow.json";

  console.log("imageUrl-> ", imageUrl);
  console.log("tokenUri-> ", tokenUri);

  console.log("req.body-> ", req.body);

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY || "",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  console.log("Extracted address from FID-> ", accountAddress);

  console.log("frame message-> ", message);

  // Frame Meassage
  // try {
  //   status = await getFrameValidatedMessage(body);

  //   console.log("Frame message status-> ", status);
  // } catch (error) {
  //   console.log("Error getting Frame message-> ", error);
  // }

  // // // redirect to Lenspost
  // if (status?.frameActionBody?.buttonIndex === 2) {
  //   console.log("redirecting to Lenspost");
  //   return NextResponse.redirect("https://app.lenspost.xyz", {
  //     status: 302,
  //   });
  // }

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

    btnText = "Minted";

    return new NextResponse(`
        <!DOCTYPE html><html><head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="${btnText}" />
        <meta property="fc:frame:button:1:action" content="none">
        <meta property="fc:frame:button:2" content="Check Lenspost" />
        <meta property="fc:frame:button:2:action" content="post_redirect">
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
