import React from 'react';

interface TailwindSvgProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

const TailwindSvg: React.FC<TailwindSvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 40 40"
      {...props}
    >
      <path d="M30.832 15.852a7.08 7.08 0 01-3.184-2.235A9.601 9.601 0 0020 10a7.866 7.866 0 00-8.332 6.668 5.379 5.379 0 015.832-2.484 7.217 7.217 0 013.184 2.25A9.61 9.61 0 0028.332 20a7.87 7.87 0 008.336-6.668 5.342 5.342 0 01-5.836 2.52zM9.168 24.148a7.08 7.08 0 013.184 2.235A9.601 9.601 0 0020 30a7.866 7.866 0 008.332-6.668 5.379 5.379 0 01-5.832 2.484 7.217 7.217 0 01-3.184-2.25A9.663 9.663 0 0011.668 20a7.87 7.87 0 00-8.336 6.668 5.342 5.342 0 015.836-2.52zm0 0" />
    </svg>
  )
}

export default TailwindSvg;