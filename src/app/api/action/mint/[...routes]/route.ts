import { NextResponse, NextRequest } from 'next/server';
import { mintBLink } from '@/services/mintBLink';
import { ActionsSpecPostResponse } from '@/spec';

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const blinkId = ctx.params.routes[0];
  const owner = ctx.params.routes[1];

  const mintBLinkRes = await mintBLink(blinkId, owner);

  const response: ActionsSpecPostResponse = {
    transaction: mintBLinkRes?.tx
  };

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
