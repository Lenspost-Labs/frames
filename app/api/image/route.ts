import { config } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({
    contract: config?.contractAddress,
    // wallet: config?.wallet,
  });
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
