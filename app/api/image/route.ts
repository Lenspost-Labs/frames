import { config } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";
import { NFTStorage, File } from "nft.storage";
import PinataClient from "@pinata/sdk";
import lighthouse from "@lighthouse-web3/sdk";
// import { uploadMetadataToIpfs } from "@/utils/uploadMetadata";
import { Readable } from "stream";
import axios from "axios";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const canvasID = req.nextUrl.searchParams.get("id");

  const res = await axios.get(
    `https://lenspost-development.up.railway.app/util/get-image-canvas?id=${canvasID}`
  );

  const { message } = res.data;

  // const img = Buffer.from(message);

  console.log("imageUrl-> ", message);

  return NextResponse.json(
    {
      message,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

// id: 19975
// http://localhost:3000/api/image?id=19975
