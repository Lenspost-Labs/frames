import {
  LENSPOST_APP_URL,
  MINT_PAGE_URL,
  CHAIN_HELPER,
  NULL_ADDRESS,
  TOKENS
} from '@/data';
import { priceFormatter, formatAddress } from '@/utils';
import { readContractData } from '@/services';
import { LENSPOST_721 } from '@/contracts';
import { ExternalLink } from '@/assets';
import { FrameData } from '@/types';
import { CopyButton } from '@/ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const FrameCard: FC<FrameData> = async ({
  isGatedCollections,
  creatorSponsored,
  contractAddress,
  isGatedChannels,
  contractType,
  allowedMints,
  redirectLink,
  isRecast,
  isFollow,
  imageUrl,
  minters,
  chainId,
  isLike,
  owner,
  slug
}) => {
  const NATIVE_CURRENCY =
    CHAIN_HELPER[chainId as keyof typeof CHAIN_HELPER]?.nativeCurrency?.symbol;
  const CHAIN_NAME = CHAIN_HELPER[chainId as keyof typeof CHAIN_HELPER]?.name;
  const minted = minters?.length;

  const { pricePerToken, tokenAddress } = await readContractData(
    contractAddress as `0x${string}`,
    'claimCondition',
    CHAIN_HELPER[Number(chainId) as keyof typeof CHAIN_HELPER]?.id,
    LENSPOST_721?.abi
  );
  const formattedPrice = priceFormatter(chainId, pricePerToken);

  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-2xl sm:flex-row sm:p-10">
      <Image
        className="w-full rounded-3xl shadow-xl sm:w-1/2"
        priority={true}
        src={imageUrl}
        height={1080}
        width={1920}
        alt="image"
      />
      <div className="w-full">
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
        <div className="flex w-full flex-wrap gap-6">
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Contract
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              <span className="flex items-center gap-1">
                {formatAddress(contractAddress)}
                <CopyButton
                  successMessage="Address copied!"
                  text={contractAddress as string}
                />
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Network
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">{CHAIN_NAME}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Type
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">{contractType}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Owner
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              <span className="flex items-center gap-1">
                {formatAddress(owner)}
                <CopyButton
                  text={contractAddress as string}
                  successMessage="Address copied"
                />
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Minted
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {minted}/{allowedMints}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Sponsored
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {creatorSponsored ? 'Yes' : 'No'}
            </p>
          </div>
          {tokenAddress ? (
            <div>
              <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
                Price
              </p>
              <p className="text-sm text-[#11111b] sm:text-sm">
                {formattedPrice}{' '}
                {!NULL_ADDRESS?.includes(tokenAddress)
                  ? TOKENS?.[tokenAddress]?.symbol
                  : NATIVE_CURRENCY}
              </p>
            </div>
          ) : null}
        </div>
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
        <div>
          <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
            Gated with:
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-6">
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Follow
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {isFollow ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Like
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {isLike ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Recast
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {isRecast ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Channel
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {isGatedChannels ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Collection
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {isGatedCollections ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
        {redirectLink && (
          <>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-semibold text-[#11111b] sm:text-sm">
                Know more about this Frame
              </h3>
              <Link href={redirectLink} target="_blank">
                <ExternalLink
                  className="cursor-pointer"
                  height={16}
                  width={16}
                />
              </Link>
            </div>
            <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
          </>
        )}

        <div className="flex flex-wrap gap-2">
          {!creatorSponsored && (
            <Link
              className="mt-2 flex w-full items-center gap-1 rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit"
              href={`${MINT_PAGE_URL}/mint/${slug}`}
              target="_blank"
            >
              Mint on Poster
              <ExternalLink className="cursor-pointer" height={16} width={16} />
            </Link>
          )}
          <Link
            className="mt-2 flex w-full items-center gap-1 rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit"
            href={LENSPOST_APP_URL}
            target="_blank"
          >
            Remix on Poster
            <ExternalLink className="cursor-pointer" height={16} width={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrameCard;
