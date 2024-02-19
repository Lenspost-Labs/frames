import { config } from "@/config/config";
import { MintFrameData } from "@/types/types";
import axios from "axios";

export const mintFrame = async (
  frameId: string,
  recipientAddress: string
): Promise<MintFrameData> => {
  try {
    const res = await axios.post(`${config?.BACKEND_URL}/mint`, {
      frameId,
      recipientAddress,
    });

    return {
      tx: res.data?.tx,
      message: res.data?.message,
    };
  } catch (error) {
    console.log("Error minting NFT-> ", error);
    return {
      tx: "",
      message: "Error minting NFT",
    };
  }
};
