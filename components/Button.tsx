"use client";

interface ButtonProps {
  title: string;
  target: string;
  className?: string;
  icon?: JSX.Element;
}
const Button = ({ title, target, className, icon }: ButtonProps) => {
  return (
    <button className={className} onClick={() => window.open(target, "_blank")}>
      {title}
      <div>{icon && icon}</div>
    </button>
  );
};

export default Button;
