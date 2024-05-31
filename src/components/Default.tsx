import { LENSPOST_APP_NAME, LENSPOST_APP_URL, SOCIAL } from '@/data';
import { ArrorRight } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  color?: string;
  text: string;
}

const Default: FC<Props> = ({ color, text }) => {
  return (
    <div className="mx-auto flex max-w-4xl items-center justify-center gap-8 rounded-3xl bg-white px-6 py-10 shadow-2xl md:w-1/2">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center">
          <h1 className={`text-3xl font-semibold text-${color}-500`}>{text}</h1>
        </div>
        <Link
          className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-solid border-gray-400 p-3 transition-transform hover:scale-105"
          href={LENSPOST_APP_URL}
          target="_blank"
        >
          <p className="text-xl text-[#11111b]">Remix on {LENSPOST_APP_NAME}</p>
          <ArrorRight strokeWidth={2} height={16} width={16} />
        </Link>
        <div className="flex items-center justify-between gap-4">
          {SOCIAL?.map((social, index) => (
            <Link
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#E7D9E9] p-2 transition-all hover:bg-[#D9C9D9]"
              href={social?.url}
              target="_blank"
              key={index}
            >
              <Image
                alt={social?.name}
                src={social?.icon}
                height={60}
                width={60}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Default;
