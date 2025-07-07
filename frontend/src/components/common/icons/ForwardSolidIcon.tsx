export default function ForwardSolidIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.54004 2.65932C3.74792 2.55941 3.99467 2.5875 4.17477 2.73158L10.1748 7.53158C10.3171 7.64545 10.4 7.81783 10.4 8.0001C10.4 8.18237 10.3171 8.35476 10.1748 8.46862L4.17477 13.2686C3.99467 13.4127 3.74792 13.4408 3.54004 13.3409C3.33216 13.241 3.19995 13.0307 3.19995 12.8001V3.2001C3.19995 2.96946 3.33216 2.75923 3.54004 2.65932ZM12.8 3.80011V3.20011H11.6V3.80011V12.2001V12.8001H12.8V12.2001V3.80011Z"
        fill="currentColor"
      />
    </svg>
  );
}
