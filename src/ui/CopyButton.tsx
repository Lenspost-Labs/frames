'use client';

import { Clipboard } from '@/assets';
import { toast } from 'sonner';
import { FC } from 'react';

interface CopyButtonProps {
  successMessage?: string;
  text: string;
}

const CopyButton: FC<CopyButtonProps> = ({ successMessage, text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success(successMessage);
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

export default CopyButton;
