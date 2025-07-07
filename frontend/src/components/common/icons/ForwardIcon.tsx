export default function ForwardIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.15566 3.49245C4.96055 3.33636 4.69324 3.30593 4.46804 3.41417C4.24283 3.5224 4.09961 3.75015 4.09961 4.00001V16C4.09961 16.2499 4.24283 16.4776 4.46804 16.5859C4.69324 16.6941 4.96055 16.6637 5.15566 16.5076L12.6557 10.5076C12.8098 10.3842 12.8996 10.1975 12.8996 10C12.8996 9.80255 12.8098 9.6158 12.6557 9.49245L5.15566 3.49245ZM11.2091 10L5.39961 14.6476V5.35242L11.2091 10ZM15.8996 4.75001V4.10001H14.5996V4.75001V15.25V15.9H15.8996V15.25V4.75001Z"
        fill="currentColor"
      />
    </svg>
  );
}
