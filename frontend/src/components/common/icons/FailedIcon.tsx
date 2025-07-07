export default function FailedIcon({ className }: { className?: string }) {
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
        d="M17.2963 14.4987L11.2963 3.9987C11.1655 3.76786 10.9758 3.57584 10.7465 3.44226C10.5173 3.30867 10.2567 3.23828 9.99135 3.23828C9.72601 3.23828 9.46542 3.30867 9.23616 3.44226C9.0069 3.57584 8.81718 3.76786 8.68635 3.9987L2.68635 14.4987C2.55411 14.7277 2.48477 14.9876 2.48536 15.2521C2.48594 15.5165 2.55643 15.7761 2.68968 16.0046C2.82293 16.233 3.01421 16.4221 3.24412 16.5528C3.47403 16.6835 3.7344 16.7511 3.99885 16.7487H15.9988C16.262 16.7484 16.5205 16.6789 16.7483 16.5472C16.9761 16.4154 17.1653 16.226 17.2967 15.998C17.4282 15.7701 17.4974 15.5115 17.4973 15.2483C17.4972 14.9851 17.4279 14.7266 17.2963 14.4987Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99902 7.75V10.75"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M9.99902 13.75H10.0074"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
