'use client';

import {
  LENSPOST_ETH_ADDRESS,
  CREATORS_REWARD_FEE,
  CDN_IMAGE_URL,
  S3_IMAGE_URL,
  chainName
} from '@/data';
import { useEffect, useState, FC } from 'react';
import { FrameData } from '@/types';
import { Clipboard, Share } from '@/assets';
import Image from 'next/image';
import { formatAddress } from '@/utils';

const FrameCard: FC<FrameData> = ({
  isGatedCollections,
  creatorSponsored,
  isGatedChannels,
  contractAddress,
  contractType,
  allowedMints,
  redirectLink,
  isRecast,
  isFollow,
  imageUrl,
  tokenUri,
  message,
  minters,
  chainId,
  frameId,
  isLike,
  owner,
  slug
}) => {
  const imageCdnUrl = imageUrl?.replace(S3_IMAGE_URL, CDN_IMAGE_URL);
  const minted = minters?.length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-2xl sm:flex-row sm:p-10">
      <Image
        className="w-full rounded-3xl shadow-xl sm:w-1/2"
        blurDataURL="/blur.png"
        placeholder="blur"
        src={imageCdnUrl}
        priority={true}
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
                <Clipboard
                  onClick={() => copyToClipboard(contractAddress as string)}
                  className="cursor-pointer"
                  height={16}
                  width={16}
                />
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#11111b] sm:text-sm">
              Network
            </p>
            <p className="text-sm text-[#11111b] sm:text-sm">
              {chainName[chainId as keyof typeof chainName]}
            </p>
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
                <Clipboard
                  onClick={() => copyToClipboard(owner as string)}
                  className="cursor-pointer"
                  height={16}
                  width={16}
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
        <h3 className="text-sm font-semibold text-[#11111b] sm:text-sm">
          Know more about this Frame
        </h3>

        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />

        <div className="flex flex-wrap gap-2">
          <div className="mt-2 w-full rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit">
            Mint on Poster
          </div>
          <div className="mt-2 w-full rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit">
            Remix on Poster
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameCard;
