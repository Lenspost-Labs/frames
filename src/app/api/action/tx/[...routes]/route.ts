import {
  VersionedTransaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey
} from '@solana/web3.js';
import {
  ActionsSpecPostRequestBody,
  ActionsSpecPostResponse
} from '@/spec/actions-spec';
import { NextResponse, NextRequest } from 'next/server';
import { prepareTransaction } from '@/utils';

async function prepareDonateTransaction(
  sender: PublicKey,
  recipient: PublicKey,
  lamports: number
): Promise<VersionedTransaction> {
  const payer = new PublicKey(sender);
  const instructions = [
    SystemProgram.transfer({
      toPubkey: new PublicKey(recipient),
      lamports: lamports,
      fromPubkey: payer
    })
  ];
  return prepareTransaction(instructions, payer);
}

const handler = async (req: NextRequest, ctx: any): Promise<NextResponse> => {
  const amount = ctx.params.routes[0];
  const owner = ctx.params.routes[1];

  const { account } = (await req.json()) as ActionsSpecPostRequestBody;

  const parsedAmount = parseFloat(amount);

  const transaction = await prepareDonateTransaction(
    new PublicKey(account),
    new PublicKey(owner),
    parsedAmount * LAMPORTS_PER_SOL
  );

  const response: ActionsSpecPostResponse = {
    transaction: Buffer.from(transaction.serialize()).toString('base64')
  };

  return NextResponse.json(response);
};

export const POST = async (req: NextRequest, ctx: any): Promise<Response> => {
  return handler(req, ctx);
};

export const dynamic = 'force-dynamic';
