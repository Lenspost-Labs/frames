import { NextResponse, NextRequest } from 'next/server';
import { getFrameData } from '@/services';

const DONATION_AMOUNT_SOL_OPTIONS = [0.001, 0.01, 0.1];
const DEFAULT_DONATION_AMOUNT_SOL = 0.001;

export async function GET(req: NextRequest, ctx: any) {
  const { id } = ctx.params;
  const { imageUrl: icon, description, title, owner } = await getFrameData(id);
  const amountParameterName = 'amount';

  const response = {
    links: {
      actions: [
        ...DONATION_AMOUNT_SOL_OPTIONS.map((amount) => ({
          href: `/api/action/tx/${amount}?owner=${owner}`,
          label: `${amount} SOL`
        })),
        {
          parameters: [
            {
              label: 'Enter a custom SOL amount',
              name: amountParameterName
            }
          ],
          href: `/api/action/tx/{${amountParameterName}}`,
          label: 'Submit'
        }
      ]
    },
    label: `${DEFAULT_DONATION_AMOUNT_SOL} SOL`,
    description,
    title,
    icon
  };

  return NextResponse.json(response);
}
