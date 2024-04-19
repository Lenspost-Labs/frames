import { getFrameData, updateFrameData } from "@/services";
import { getFrame } from "@/utils";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let txHash: string | undefined = "";

  const frameIdParam = req.nextUrl.searchParams.get("frameId") || "";
  const accountAddress = req.nextUrl.searchParams.get("accountAddress") || "";

  // get frame data
  const getFrameDataRes = await getFrameData(frameIdParam);
  const { frameId, imageUrl, redirectLink } = getFrameDataRes;

  if (!frameId) {
    btnText = "FrameId not found";
    return new NextResponse(
      getFrame(accountAddress, false, imageUrl, btnText, redirectLink)
    );
  }

  const body: FrameRequest = await req.json();
  txHash = body?.untrustedData?.transactionId;

  console.log(frameId, "req.body-> ", body?.untrustedData?.transactionId);

  // update frame data with txHash and minterAddress
  if (txHash) {
    const updateFrameDataRes = await updateFrameData(
      frameId.toString(),
      accountAddress,
      txHash
    );
    console.log(frameId, "Frame data updated-> ", updateFrameDataRes.message);
  }

  btnText = "View tx";

  return new NextResponse(
    getFrame(accountAddress, txHash, imageUrl, btnText, redirectLink)
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
