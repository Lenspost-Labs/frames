import { NextResponse, NextRequest } from 'next/server';
import { getBlinkData } from '@/services';

const DONATION_AMOUNT_SOL_OPTIONS = [0.001, 0.01, 0.1];
const DEFAULT_DONATION_AMOUNT_SOL = 0.001;

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const { id } = ctx.params;
  const {
    imageUrl: icon,
    description,
    blinkId,
    title,
    owner
  } = await getBlinkData(id);
  const amountParameterName = 'amount';
  const amount = 0.05;

  const response = {
    links: {
      actions: [
        {
          href: `/api/action/mint/${blinkId}/${owner}`,
          label: `Mint`
        },
        {
          href: `/api/action/tx/${amount}/${owner}`,
          label: `Donate ${amount} SOL`
        }
      ]
    },
    label: `${DEFAULT_DONATION_AMOUNT_SOL} SOL`,
    description,
    title,
    icon
  };

  return NextResponse.json(response);
};

export const GET = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
