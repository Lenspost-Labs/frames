import { config } from "@/config/config";
import lighthouse from "@lighthouse-web3/sdk";

const uploadMediaToIpfs = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const myBuffer = await res.arrayBuffer();
  const myBlob = Buffer.from(myBuffer);

  try {
    const result = await lighthouse.uploadBuffer(
      myBlob,
      config?.lightHouseApiKey
    );

    console.log("imageToIpfs-> ", "ipfs://" + result.data?.Hash);

    return result.data?.Hash;
  } catch (error) {
    console.log("Error uploading media to IPFS-> ", error);
  }
};

export const uploadMetadataToIpfs = async (imageUrl: string) => {
  const metadata = {
    name: "My NFT",
    description: "My NFT description",
    image: "ipfs://" + (await uploadMediaToIpfs(imageUrl)),
  };
  try {
    let { data } = await lighthouse.uploadText(
      JSON.stringify(metadata),
      config?.lightHouseApiKey
    );

    console.log("metadata-> ", `https://ipfs.io/ipfs/${data?.Hash}`);

    return `https://ipfs.io/ipfs/${data?.Hash}`;
  } catch (error) {
    console.log("Error uploading metadata to IPFS-> ", error);
  }
};
