import { config } from "@/config/config";
import PinataClient from "@pinata/sdk";
import { Readable } from "stream";
// import lighthouse from "@lighthouse-web3/sdk";

// const uploadMediaToIpfs = async (imageUrl: string) => {
//   const res = await fetch(imageUrl);
//   const myBuffer = await res.arrayBuffer();
//   const myBlob = Buffer.from(myBuffer);

//   try {
//     const result = await lighthouse.uploadBuffer(
//       myBlob,
//       config?.lightHouseApiKey
//     );

//     console.log("imageToIpfs-> ", "ipfs://" + result.data?.Hash);

//     return result.data?.Hash;
//   } catch (error) {
//     console.log("Error uploading media to IPFS-> ", error);
//   }
// };

// export const uploadMetadataToIpfs = async (imageUrl: string) => {
//   const metadata = {
//     name: "My NFT",
//     description: "My NFT description",
//     image: "ipfs://" + (await uploadMediaToIpfs(imageUrl)),
//   };
//   try {
//     let { data } = await lighthouse.uploadText(
//       JSON.stringify(metadata),
//       config?.lightHouseApiKey
//     );

//     console.log("metadata-> ", `https://ipfs.io/ipfs/${data?.Hash}`);

//     return `https://ipfs.io/ipfs/${data?.Hash}`;
//   } catch (error) {
//     console.log("Error uploading metadata to IPFS-> ", error);
//   }
// };

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
    description: "My NFT description",
    image: "ipfs://" + (await imageFileToIpfs(imageUrl)),
  };

  try {
    const cid = await pinata.pinJSONToIPFS(metadata);
    return `https://ipfs.io/ipfs/${cid.IpfsHash}`;
  } catch (error) {
    console.log("Error uploading metadata to IPFS-> ", error);
  }
};
