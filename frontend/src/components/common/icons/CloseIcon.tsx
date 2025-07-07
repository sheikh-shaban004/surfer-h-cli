export default function CloseIcon({ className = "" }: { className?: string }) {
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
        d="M15.4097 5.50972L15.8693 5.0501L14.9501 4.13086L14.4905 4.59048L10.0001 9.08086L5.50972 4.59048L5.0501 4.13086L4.13086 5.0501L4.59048 5.50972L9.08086 10.0001L4.59048 14.4905L4.13086 14.9501L5.0501 15.8693L5.50972 15.4097L10.0001 10.9193L14.4905 15.4097L14.9501 15.8693L15.8693 14.9501L15.4097 14.4905L10.9193 10.0001L15.4097 5.50972Z"
        fill="currentColor"
      />
    </svg>
  );
}
