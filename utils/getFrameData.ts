import { config } from "@/config/config";
import { FrameData } from "@/types/types";
import axios from "axios";

export const getFrameData = async (frameId: string): Promise<FrameData> => {
  try {
    const res = await axios.get(
      `${config?.BACKEND_URL}/util/get-frame-data?frameId=${frameId}`
    );

    const data = res.data?.data;

    return {
      frameId: data?.id,
      imageUrl: data?.imageUrl,
      tokenUri: data?.tokenUri,
      minters: data?.minters,
      owner: data?.owner,
      isTopUp: data?.isTopUp,
      allowedMints: data?.allowedMints,
      isLike: data?.isLike,
      isRecast: data?.isRecast,
      isFollow: data?.isFollow,
      redirectLink: data?.redirectLink,
      noOfNftsMinited: data?.minters?.length || 0,
    };
  } catch (error) {
    console.log("Error getting frame data-> ", error);
    return {
      frameId: undefined,
      imageUrl: "",
      tokenUri: "",
      minters: [{ minterAddress: "", txHash: "" }],
      owner: "",
      isTopUp: false,
      allowedMints: 0,
      isLike: false,
      isRecast: false,
      isFollow: false,
      redirectLink: "",
      noOfNftsMinited: 0,
    };
  }
};
