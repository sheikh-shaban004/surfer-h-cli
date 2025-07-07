"use client";

import Link from "next/link";
import { HLogoIcon } from "@/components/common/icons";
import { cn } from "@/utils";

interface HLogoProps {
  className?: string;
  width?: number;
  height?: number;
  animated?: boolean;
  includeText?: boolean;
  linkToHome?: boolean;
  textClassName?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * A reusable H logo component that can optionally link to the home page
 */
export function HLogo({
  className = "",
  width,
  height,
  animated = false,
  includeText = true,
  linkToHome = false,
  textClassName = "",
  size = 'medium',
}: HLogoProps) {
  // Define consistent sizes
  const sizes = {
    small: { w: 16, h: 16, text: "text-base" },
    medium: { w: 20, h: 20, text: "text-2xl" },
    large: { w: 28, h: 28, text: "text-3xl" },
  };

  const { w, h, text } = sizes[size];

  // Use provided width/height or default from size
  const logoWidth = width || w;
  const logoHeight = height || h;

  // Calculate the text style based on logo height

  const logo = (
    <>
      <HLogoIcon
        animated={animated}
        className={cn("text-gray-8 w-4 h-4", className)}
      />
    </>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="w-5 h-5 flex items-center justify-center">
        {logo}
      </Link>
    );
  }

  return (
    <div className="w-5 h-5 flex items-center justify-center">
      {logo}
    </div>
  );
}
