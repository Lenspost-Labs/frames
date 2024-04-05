import { config } from "@/configs/config";
import { UpdateFrameData } from "@/types/types";
import { errorMessage } from "@/utils";
import axios from "axios";

export const updateFrameData = async (
  frameId: string,
  minterAddress: string,
  txHash: string
): Promise<UpdateFrameData> => {
  try {
    const res = await axios.post(
      `${config?.BACKEND_URL}/util/update-frame-data`,
      {
        frameId,
        minterAddress,
        txHash,
      }
    );

    return {
      status: res.data?.status,
      message: res.data?.message,
    };
  } catch (error: any) {
    console.log("Error updating frame data-> ", error);
    return {
      status: "error",
      message: errorMessage(error),
    };
  }
};
