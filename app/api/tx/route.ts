import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "@wagmi/core/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { config } from "@/config/config";
import { BaseAbi, BaseContractAddress, zoraAbi } from "@/contract";
import { APP_ETH_ADDRESS } from "@/constants";
import { erc721DropABI } from "@zoralabs/zora-721-contracts";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  let address: `0x${string}`;

  const chainId = req.nextUrl.searchParams.get("chainId") || base.id;
  const contractAddress =
    req.nextUrl.searchParams.get("contract_address") || "";

  console.log({
    chainId,
    contractAddress,
  });

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

  address = message.interactor.verified_accounts[0] as any;
  console.log("isValid-> ", message);

  const data = encodeFunctionData({
    abi: erc721DropABI,
    functionName: "mintWithRewards",
    // @ts-ignore
    args: [address, 1, "My awsome token", APP_ETH_ADDRESS],
  });

  console.log("data-> ", data);

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${chainId}`, // Remember Base Sepolia might not work on Warpcast yet
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: contractAddress as any,
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
