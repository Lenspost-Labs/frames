import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const imageUrl = req.nextUrl.searchParams.get("imageUrl") || "";

  const body: FrameRequest = await req.json();
  
  console.log("req.body-> ", body?.untrustedData?.transactionId);

  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Tx: ${body?.untrustedData?.transactionId || "--"}`,
        },
      ],
      image: {
        src: imageUrl,
        aspectRatio: "1:1",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
