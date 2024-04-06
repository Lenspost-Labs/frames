import { config } from "@/configs/config";
import { UserCanvasData } from "@/types/types";
import axios from "axios";
import { errorMessage } from "../utils";

export const getUserData = async (userId: string): Promise<UserCanvasData> => {
  try {
    const res = await axios.get(
      `${config?.BACKEND_URL}/public/random-user-canvas/${userId}`
    );

    const data = res.data;
    console.log("data-> ", res?.data);

    return {
      userId: userId,
      imageURL: data?.message,
      slug: data?.slug || "",
    };
  } catch (error: any) {
    console.log("Error getting frame data-> ", error?.response?.data?.message);
    return {
      userId: "",
      imageURL: "",
      slug: "",
    };
  }
};
