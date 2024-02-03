import { config } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { generatePrivateKey } from "viem/accounts";

async function getResponse(req: NextRequest): Promise<NextResponse> {
 
  return NextResponse.json({
    contract: config?.contractAddress,
    privateKey: config?.wallet,
    wallet: privateKeyToAccount(config?.wallet),
    walletType: typeof config?.wallet,
  });
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
