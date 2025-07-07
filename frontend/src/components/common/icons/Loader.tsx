export default function LoaderIcon({
  className = "",
  height = 20,
  width = 20,
}: {
  className?: string;
  height?: number;
  width?: number;
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
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner-path {
            animation: spin 1s linear infinite;
            transform-origin: center;
          }
        `}
      </style>
      <path
        d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
        stroke="var(--gray-5)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="spinner-path"
        d="M16.6574 12.1631C16.9988 11.1125 17.0866 9.99603 16.9138 8.90496C16.741 7.81389 16.3124 6.7792 15.6631 5.8855C15.0138 4.9918 14.1622 4.26447 13.1779 3.76295C12.1937 3.26144 11.1047 3 10 3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}
