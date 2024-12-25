import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

const FirebaseSvg: React.FC<Props> = (props) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        {...props}
    >
    <path d="M20.5 19.364L18.296 5.365a.535.535 0 00-.524-.453.525.525 0 00-.375.158L3.5 19.364l7.69 4.428a1.547 1.547 0 001.557-.003l7.753-4.425zM7.37.286A.53.53 0 006.902 0a.536.536 0 00-.525.461L4.063 15.673 9.86 5.06 7.371.289 7.37.286zm6.881 6.862L12.47 3.666a.53.53 0 00-.47-.29.53.53 0 00-.469.287l-.001.003-7.82 14.318L14.251 7.148z" />
    </svg>
  )
}

export default FirebaseSvg;