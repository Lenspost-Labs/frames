import { config } from "@/config/config";
import { MintFrameData } from "@/types/types";
import axios from "axios";
import { errorMessage } from "../utils";

export const mintFrame = async (
  frameId: string,
  recipientAddress: string
): Promise<MintFrameData> => {
  try {
    const res = await axios.post(`${config?.BACKEND_URL}/mint`, {
      frameId,
      recipientAddress,
    });

    console.log("Mint NFT response-> ", res.data);
    console.log("Mint NFT response status ", res.status);

    return {
      tx: res.data?.tx,
      message: res.data?.message,
    };
  } catch (error: any) {
    console.log("Error minting NFT-> ", error);
    return {
      tx: "",
      message: errorMessage(error),
    };
  }
};
