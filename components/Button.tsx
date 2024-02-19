"use client";

interface ButtonProps {
  title: string;
  target: string;
  className?: string;
}
const Button = ({ title, target, className }: ButtonProps) => {
  return (
    <button className={className} onClick={() => window.open(target, "_blank")}>
      {title}
    </button>
  );
};

export default Button;
