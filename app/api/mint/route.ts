import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "@wagmi/core/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { config } from "@/config/config";
import { BaseAbi, BaseContractAddress } from "@/contract";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  let address: string | undefined = "";

  const tokenURI =
    "https://lenspost.infura-ipfs.io/ipfs/QmciMWLq8nKgjZtjxsJbnFSGkfcnLLuCotxZvXokaboDWy'";

  console.log("req.body-> ", req.body);
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config.neynar.apiKey,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  address = message.interactor.verified_accounts[0];
  console.log("isValid-> ", message);

  const data = encodeFunctionData({
    abi: BaseAbi,
    functionName: "mint",
    args: [address, tokenURI],
  });

  console.log("data-> ", data);

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`, // Remember Base Sepolia might not work on Warpcast yet
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: BaseContractAddress,
      value: parseEther("0.00000").toString(), // 0.00004 ETH
    },
  };

  console.log("txData-> ", txData);

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
