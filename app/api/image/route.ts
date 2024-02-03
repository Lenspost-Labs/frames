import { config } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";
import { NFTStorage, File } from "nft.storage";
import PinataClient from "@pinata/sdk";
import lighthouse from "@lighthouse-web3/sdk";
import { uploadMetadataToIpfs } from "@/utils/uploadMetadata";

async function getResponse(req: NextRequest): Promise<NextResponse> {

  // ----------------- NFT Storage -----------------
  // const storeNFT = async () => {
  //   const nftStorage = new NFTStorage({
  //     token: config?.nftStorageApiKey,
  //   });
  //   return nftStorage.store({
  //     name: "My nft",
  //     description: "My nft description",
  //     extLink: "https://app.lenspost.com",
  //     fileType: "image/png",
  //     image: new File([myBlob], "My file", {
  //       type: "image/png",
  //     }),
  //   });
  // };

  // const result = await storeNFT();

  // console.log("result-> ", result);

  // ----------------- NFT Storage -----------------

  // ----------------- Pinata -----------------
  // const pinata = new PinataClient({
  //   pinataJWTKey: process.env.PINATA_JWT_KEY,
  // });

  // const imageFileToIpfs = async () => {
  //   const cid = await pinata.pinFileToIPFS(myBlob, {
  //     pinataMetadata: {
  //       name: "My NFT",
  //     },
  //     pinataOptions: {
  //       cidVersion: 0,
  //     },
  //   });

  //   return `https://ipfs.io/ipfs/${cid.IpfsHash}`;
  // };

  // console.log("imageFileToIpfs-> ", await imageFileToIpfs());

  // const uploadToIPFS = async () => {
  //   const metadata = {
  //     name: "My NFT",
  //     description: "My NFT description",
  //     image: myBlob,
  //   };
  //   const cid = await pinata.pinJSONToIPFS(metadata);
  //   return `https://ipfs.io/ipfs/${cid.IpfsHash}`;
  // };

  // console.log("metadata-> ", await uploadToIPFS());

  // ----------------- Pinata -----------------

  return NextResponse.json(
    { MetadataPath: await uploadMetadataToIpfs() },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
