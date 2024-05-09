import { NextResponse, NextRequest } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse('Hello, world!');
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
