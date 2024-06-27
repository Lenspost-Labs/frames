import {
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage,
  clusterApiUrl,
  Connection,
  PublicKey
} from '@solana/web3.js';
import { ENV } from '@/data';

const rpcUrl =
  ENV === 'production'
    ? process.env.RPC_URL || clusterApiUrl('mainnet-beta')
    : process.env.RPC_URL || clusterApiUrl('devnet');

export const connection = new Connection(rpcUrl);

export async function prepareTransaction(
  instructions: TransactionInstruction[],
  payer: PublicKey
) {
  const blockhash = await connection
    .getLatestBlockhash({ commitment: 'max' })
    .then((res) => res.blockhash);
  const messageV0 = new TransactionMessage({
    recentBlockhash: blockhash,
    payerKey: payer,
    instructions
  }).compileToV0Message();
  return new VersionedTransaction(messageV0);
}
