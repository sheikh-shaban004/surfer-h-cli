import { cn } from "@/utils";

interface SpinnerIconProps {
  className?: string;
}

export default function SpinnerIcon({ className = "" }: SpinnerIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-spin", className)}
    >
      <path
        d="M12 2C14.1815 2 16.3033 2.71339 18.0416 4.0314C19.78 5.34942 21.0397 7.19975 21.6287 9.30029C22.2176 11.4008 22.1035 13.6364 21.3038 15.666C20.504 17.6957 19.0625 19.4081 17.1989 20.5423C15.3354 21.6765 13.1521 22.1701 10.9819 21.948C8.81164 21.7259 6.77359 20.8002 5.17843 19.3121C3.58327 17.8239 2.51851 15.8549 2.14648 13.7053C1.77445 11.5557 2.11557 9.34346 3.11782 7.40577"
        stroke="#CCCCD1"
        strokeWidth="3"
      />
    </svg>
  );
}
