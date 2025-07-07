"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import LogoAnimation from "../../../../public/logos/h-lottie/h-logo.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AnimatedLogo({
  className = "",
  width = 40,
  height = 40,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div style={{ width, height }} className={className}>
      <Lottie
        animationData={LogoAnimation}
        renderer="svg"
        loop={true}
        autoPlay={true}
        style={{
          filter: isDarkMode ? "brightness(0) invert(1)" : "none"
        }}
      />
    </div>
  );
}
