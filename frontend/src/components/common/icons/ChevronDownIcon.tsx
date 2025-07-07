export default function ChevronDownIcon({
  className = "",
  height = 18,
  width = 18,
  fill = "currentColor",
}: {
  className?: string;
  height?: number;
  width?: number;
  fill?: string;
}) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00005 7.58075L5.45967 8.04037L10 12.5807L14.5404 8.04037L15 7.58075L15.9193 8.49999L15.4597 8.95961L10.4597 13.9596C10.2058 14.2134 9.79427 14.2134 9.54043 13.9596L4.54043 8.95961L4.08081 8.49999L5.00005 7.58075Z"
        fill={fill}
      />
    </svg>
  );
}
