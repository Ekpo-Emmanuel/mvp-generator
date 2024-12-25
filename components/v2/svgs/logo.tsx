import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

const LogoSvg: React.FC<Props> = (props) => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="logo-72"
    width="22"
    fill="none"
    viewBox="0 0 53 44"
    {...props}
    >
      <path
        d="m23.3 0 28.746 28.63V44H38.631v-9.845L17.752 13.361h-4.337V44H0V0zM38.63 15.27V0h13.415v15.27z"
      />
  </svg>
  )
}

export default LogoSvg;