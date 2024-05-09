'use client';

import React, { ReactNode } from 'react';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  icon?: ReactNode;
  title?: string;
}

const Button = ({
  className = '',
  size = 'md',
  children,
  disabled,
  onClick,
  outline,
  title,
  icon
}: ButtonProps) => {
  return (
    <button
      className="mt-2 flex w-full items-center gap-1 rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit"
      onClick={onClick && onClick}
      disabled={disabled}
    >
      {title && <span>{title}</span>}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
