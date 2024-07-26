import { NextResponse, NextRequest } from 'next/server';

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const { prompt } = ctx.params;

  return NextResponse.json(prompt);
};

export const POST = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
