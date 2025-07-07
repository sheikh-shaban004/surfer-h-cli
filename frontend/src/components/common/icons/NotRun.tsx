interface NotRunIconProps {
  className?: string;
  height?: number;
  width?: number;
}

export default function NotRunIcon({
  className,
  height = 20,
  width = 20,
}: NotRunIconProps) {
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
        d="M9 0.849609C13.5011 0.84961 17.1504 4.49888 17.1504 9C17.1504 13.5011 13.5011 17.1504 9 17.1504C4.49888 17.1504 0.84961 13.5011 0.849609 9C0.849609 4.49888 4.49888 0.849609 9 0.849609ZM5.81836 8.34961L5.16797 8.35059V9.64941L5.81836 9.65039H12.1816L12.832 9.64941V8.35059L12.1816 8.34961H5.81836Z"
        fill="currentColor"
      />
    </svg>
  );
}
