import { config } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";
import { NFTStorage, File } from "nft.storage";
import PinataClient from "@pinata/sdk";
import lighthouse from "@lighthouse-web3/sdk";
import { uploadMetadataToIpfs } from "@/utils/uploadMetadata";
import { Readable } from "stream";
import axios from "axios";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const imageUrl =
    "https://lenspost.s3.ap-south-1.amazonaws.com/user/58/canvases/19242-0.png";

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
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  const pinata = new PinataClient({
    pinataJWTKey: process.env.PINATA_JWT_KEY,
  });

  const imageFileToIpfs = async () => {
    try {
      const cid = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
          name: "My NFT",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      });

      return cid.IpfsHash;
    } catch (error) {
      console.log("Error uploading media to IPFS-> ", error);
    }
  };

  // console.log("imageFileToIpfs-> ", await imageFileToIpfs());

  const uploadToIPFS = async () => {
    const metadata = {
      name: "My NFT",
      description: "My NFT description",
      image: "ipfs://" + (await imageFileToIpfs()),
    };

    try {
      const cid = await pinata.pinJSONToIPFS(metadata);
      return `https://ipfs.io/ipfs/${cid.IpfsHash}`;
    } catch (error) {
      console.log("Error uploading metadata to IPFS-> ", error);
    }
  };

  // console.log("metadata-> ", await uploadToIPFS());

  // ----------------- Pinata -----------------

  return NextResponse.json(
    { MetadataPath: await uploadToIPFS() },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
