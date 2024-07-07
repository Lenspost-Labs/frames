import { NextResponse, NextRequest } from 'next/server';
import { mintBLink } from '@/services/mintBLink';

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const blinkId = ctx.params.routes[0];
  const owner = ctx.params.routes[1];

  const mintBLinkRes = await mintBLink(blinkId, owner);

  return NextResponse.json({ message: 'Minted' });
};

export const POST = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
