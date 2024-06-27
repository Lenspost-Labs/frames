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

const DONATION_DESTINATION_WALLET =
  '6fymrSZoPoV5J2XBkUofRDSrzKwpPk8NDPgBvErxSa1t';

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

export async function POST(req: NextRequest, ctx: any) {
  const { amount } = ctx.params;
  const owner = req.nextUrl.searchParams.get('owner') as any;
  const { account } = (await req.json()) as ActionsSpecPostRequestBody;

  const parsedAmount = parseFloat(amount);

  const transaction = await prepareDonateTransaction(
    new PublicKey(account),
    new PublicKey(DONATION_DESTINATION_WALLET),
    parsedAmount * LAMPORTS_PER_SOL
  );

  const response: ActionsSpecPostResponse = {
    transaction: Buffer.from(transaction.serialize()).toString('base64')
  };

  return NextResponse.json(response);
}
