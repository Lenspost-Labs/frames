import { config } from "@/config/config";
import lighthouse from "@lighthouse-web3/sdk";

const imageUrl =
  "https://lenspost.s3.ap-south-1.amazonaws.com/user/58/canvases/19242-0.png";

const uploadMediaToIpfs = async () => {
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

export const uploadMetadataToIpfs = async () => {
  const metadata = {
    name: "My NFT",
    description: "My NFT description",
    image: "ipfs://" + (await uploadMediaToIpfs()),
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
