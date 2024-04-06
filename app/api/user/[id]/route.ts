import { NextRequest, NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { config } from "@/configs/config";
import { getFrame } from "@/utils";
import { getUserData, mintFrame, updateFrameData } from "@/services";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";
  const userId = req.nextUrl.pathname.split("/").pop() || "";

  const getUserDataRes = await getUserData(userId);

  const { slug, imageURL } = getUserDataRes;

  if (!userId) {
    btnText = "UserId not found";
    return new NextResponse(getFrame(accountAddress, false, imageURL, btnText));
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Next Poster",
          postUrl: `${config?.BACKEND_URL}/public/random-user-canvas/${userId}`,
        },
      ],
      image: {
        src: imageURL,
        aspectRatio: "1:1",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
