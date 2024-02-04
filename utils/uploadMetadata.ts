import { config } from "@/config/config";
import PinataClient from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new PinataClient({
  pinataJWTKey: config?.pinataJwtKey,
});

const imageFileToIpfs = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);
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

export const uploadMetadataToIpfs = async (imageUrl: string) => {
  const metadata = {
    name: "My NFT",
    description: "Awsome NFT from Frames Lenspost",
    image: "ipfs://" + (await imageFileToIpfs(imageUrl)),
  };

  try {
    const cid = await pinata.pinJSONToIPFS(metadata);
    return `https://ipfs.io/ipfs/${cid.IpfsHash}`;
  } catch (error) {
    console.log("Error uploading metadata to IPFS-> ", error);
  }
};
