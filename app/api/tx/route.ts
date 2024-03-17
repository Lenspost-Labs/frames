import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { base } from "@wagmi/core/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { config } from "@/config/config";
import { BaseAbi, BaseContractAddress, zoraAbi } from "@/contract";
import { APP_ETH_ADDRESS, ZORA_REWARD_FEE } from "@/constants";
import { erc721DropABI } from "@zoralabs/zora-721-contracts";
import { writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import { getFrame } from "@/utils";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  let address: `0x${string}`;

  const chainId = req.nextUrl.searchParams.get("chainId") || base.id;
  const contractAddress =
    req.nextUrl.searchParams.get("contract_address") || "";
  const imageUrl = req.nextUrl.searchParams.get("imageUrl") || "";

  const quantity = 1n;
  const comment = "";
  const mintReferral = APP_ETH_ADDRESS;
  const mintFee = parseEther(ZORA_REWARD_FEE); // 0.000777 ETH

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

  // const data = encodeFunctionData({
  //   abi: erc721DropABI,
  //   functionName: "mintWithRewards",
  //   args: [address, quantity, comment, mintReferral],
  // });

  // console.log("data-> ", data);

  // const txData: FrameTransactionResponse = {
  //   chainId: `eip155:${chainId}`,
  //   method: "eth_sendTransaction",
  //   params: {
  //     abi: [],
  //     data,
  //     to: contractAddress as any,
  //     value: (mintFee * quantity).toString(),
  //   },
  // };

  // console.log("txData-> ", txData);

  try {
    const result = await writeContract(wagmiConfig, {
      contractAddress: BaseContractAddress,
      abi: BaseAbi,
      method: "mintWithRewards",
      args: [address, quantity, comment, mintReferral],
      // @ts-ignore
      value: mintFee,
    });

    console.log("result-> ", result);

    return new NextResponse(getFrame(address, false, imageUrl, "Minted", ""));
  } catch (error) {
    console.log("error-> ", error);
    return new NextResponse(
      getFrame(address, false, imageUrl, "Error minting", "")
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
