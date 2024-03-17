import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "@wagmi/core/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { config } from "@/config/config";
import { BaseAbi, BaseContractAddress, zoraAbi } from "@/contract";
import { APP_ETH_ADDRESS, ZORA_REWARD_FEE } from "@/constants";
import { erc721DropABI } from "@zoralabs/zora-721-contracts";
import { getFrame } from "@/utils";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  let accountAddress: `0x${string}`;
  let quantity: any;

  const comment = "";
  const mintReferral = APP_ETH_ADDRESS;
  const mintFee = parseEther(ZORA_REWARD_FEE); // 0.000777 ETH

  const chainId = req.nextUrl.searchParams.get("chainId") || base.id;
  const contractAddress =
    req.nextUrl.searchParams.get("contract_address") || "";
  const contractType = req.nextUrl.searchParams.get("contract_type") || "";

  const body: FrameRequest = await req.json();
  console.log("req.body-> ", body);

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config.neynar.apiKey,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  console.log("isValid-> ", message);
  accountAddress = message.interactor.verified_accounts[0] as any;

  // get quantity
  if (message?.input === undefined || message?.input === "0") {
    quantity = 1n;
  } else {
    quantity = BigInt(`${message?.input}`);
  }

  console.log("quantity-> ", quantity);

  if (contractType === "ERC721") {
    const data = encodeFunctionData({
      abi: erc721DropABI,
      functionName: "mintWithRewards",
      args: [accountAddress, quantity, comment, mintReferral],
    });

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${chainId}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data,
        to: contractAddress as any,
        value: (mintFee * quantity).toString(),
      },
    };

    return NextResponse.json(txData);
  }

  return NextResponse.json("Invalid contract type");
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
