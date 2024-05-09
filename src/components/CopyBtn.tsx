'use client';

import { Clipboard } from '@/assets';
import { toast } from 'sonner';
import { FC } from 'react';

const CopyBtn: FC<{ text: string }> = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied!');
  };

  return (
    <Clipboard
      className="cursor-pointer"
      onClick={copyToClipboard}
      height={16}
      width={16}
    />
  );
};

export default CopyBtn;
