import { SVGProps } from 'react';

const ArrorRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrorRight;
