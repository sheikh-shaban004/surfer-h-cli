interface PausedIconProps {
  className?: string;
  height?: number;
  width?: number;
}

export default function PausedIcon({
  className,
  height = 20,
  width = 20,
}: PausedIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        fill="#FFB224"
        stroke="#FFB224"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.25V7.75"
        stroke="#1D1D1F"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 12.25V7.75"
        stroke="#1D1D1F"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
