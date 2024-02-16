import { config } from "@/config/config";
import { BaseContractAddress, TestAbi, TestContractAddress } from "@/contract";
import { getFrame } from "@/utils";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let btnText: string | undefined = "";
  let accountAddress: string | undefined = "";
  let imageUrl: string | undefined = "";
  let tokenUri: string | undefined = "";
  let minters:
    | {
        minterAddress: string;
        txHash: string;
      }[]
    | undefined = [{ minterAddress: "", txHash: "" }];
  let owner: string | undefined = "";
  let isTopUp: boolean | undefined = false;
  let allowedMints: number | undefined = 0;
  let isLike: boolean | undefined = false;
  let isRecast: boolean | undefined = false;
  let isFollow: boolean | undefined = false;
  let noOfNftsMinited: number = 0;

  const noOfFreeMints = 10;

  const searchParams = req.nextUrl.searchParams;
  const frameId = searchParams.get("frameId");

  // get frame data
  try {
    const res = await axios.get(
      `${config?.BACKEND_URL}/util/get-frame-data?frameId=${frameId}`
    );

    const data = res.data?.data;

    imageUrl = data?.imageUrl;
    tokenUri = data?.tokenUri;
    minters = data?.minters;
    owner = data?.owner;
    isTopUp = data?.isTopUp;
    allowedMints = data?.allowedMints;
    isLike = data?.isLike;
    isRecast = data?.isRecast;
    isFollow = data?.isFollow;

    noOfNftsMinited = minters?.length || 0;
  } catch (error) {
    console.log("Error getting frame data-> ", error);
    return new NextResponse("Error getting frame data");
  }

  console.log("quries-> ", {
    imageUrl,
    tokenUri,
    minters,
    owner,
    isTopUp,
    allowedMints,
    isLike,
    isRecast,
    isFollow,
  });

  console.log("req.body-> ", req.body);

  // get frame request data from Farcaster client
  const body: FrameRequest = await req.json();

  console.log("frame request-> ", body);

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: config?.neynar?.apiKey,
  });

  accountAddress = message?.interactor.verified_accounts[0];

  console.log("frame message-> ", message);

  try {
    const res = await fetch(
      "https://frame.syndicate.io/api/v2/sendTransaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer vIvNjVKG:8VOX3A4tZP-UgAlxvEA--",
        },
        body: JSON.stringify({
          frameTrustedData: body?.trustedData?.messageBytes,
          contractAddress: BaseContractAddress,
          functionSignature: "mint(address to, string tokenURI)",
          args: { accountAddress, tokenUri },
          shouldLike: false,
          shouldRecast: false,
          shouldFollow: false,
        }),
      }
    );

    return new NextResponse(getFrame("0x", false, imageUrl, btnText));
  } catch (error) {
    console.log("Error minting frame-> ", error);
    return new NextResponse(getFrame("0x", false, imageUrl, btnText));
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
