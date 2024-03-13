import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "@wagmi/core/chains";
import BuyMeACoffeeABI from "../../_contract/BuyMeACoffeeABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { config } from "@/config/config";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  console.log("req.body-> ", req.body);

  const BUY_MY_COFFEE_CONTRACT_ADDR =
    "0xcD3D5E4E498BAb2e0832257569c3Fd4AE439dD6f";
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, {
    neynarApiKey: config.neynar.apiKey,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  console.log("isValid-> ", isValid);

  const data = encodeFunctionData({
    abi: BuyMeACoffeeABI,
    functionName: "buyCoffee",
    args: [parseEther("1"), "Coffee all day!"],
  });

  console.log("data-> ", data);

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`, // Remember Base Sepolia might not work on Warpcast yet
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: BUY_MY_COFFEE_CONTRACT_ADDR,
      value: parseEther("0.00004").toString(), // 0.00004 ETH
    },
  };

  console.log("txData-> ", txData);

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
