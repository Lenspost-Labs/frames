import { FrameData } from '@/types';
import Image from 'next/image';
import { FC } from 'react';

const ActionCard: FC<FrameData> = ({ imageUrl }) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-2xl sm:flex-row sm:p-10">
      <Image
        className="w-full rounded-3xl shadow-xl "
        priority={true}
        src={imageUrl}
        height={1080}
        width={1920}
        alt="image"
      />
    </div>
  );
};

export default ActionCard;
