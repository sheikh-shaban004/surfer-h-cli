export default function LeftArrowIcon({
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
        d="M10.4592 5.20967L10.9188 4.75005L9.99961 3.83081L9.53999 4.29043L4.28999 9.54043C4.22767 9.60275 4.18065 9.67458 4.14893 9.75124C4.11715 9.82788 4.09961 9.91192 4.09961 10C4.09961 10.0882 4.11715 10.1722 4.14893 10.2489C4.17993 10.3238 4.22554 10.3941 4.28577 10.4554M4.29063 10.4603L9.53999 15.7097L9.99961 16.1693L10.9188 15.25L10.4592 14.7904L6.31885 10.65H15.2496H15.8996V9.35005H15.2496H6.31885L10.4592 5.20967"
        fill="currentColor"
      />
    </svg>
  );
}
