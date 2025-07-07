"use client";

import dynamic from "next/dynamic";
import LogoAnimation from "../../../../public/logos/h-lottie/h-logo.json";
import { useTheme } from "next-themes";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HLogoIcon({
  className = "",
  width = 20,
  height = 20,
  animated = true,
}: {
  className?: string;
  width?: number;
  height?: number;
  animated?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return animated ? (
    <div style={{ width, height }} className={className}>
      <Lottie
        animationData={LogoAnimation}
        renderer="svg"
        loop={true}
        autoPlay={true}
        style={{
          filter: resolvedTheme === "dark" ? "brightness(0) invert(1)" : "none"
        }}
      />
    </div>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path d="M16.4001 6.32581V8.76558V11.2054V13.6451H18.8399V11.2054V8.76558V6.32581H16.4001Z" fill="currentColor"/>
      <path d="M13.9673 12.7472C15.4846 11.2299 15.4846 8.76986 13.9673 7.25256C12.45 5.73526 9.98996 5.73526 8.47266 7.25256C6.95536 8.76986 6.95536 11.2299 8.47266 12.7472C9.98996 14.2645 12.45 14.2645 13.9673 12.7472Z" fill="currentColor"/>
      <path d="M3.59981 8.76558H1.16003V11.2054H3.59981V13.6451H6.03959V11.2054V8.76558V6.32581H3.59981V8.76558Z" fill="currentColor"/>
    </svg>
  );
}
