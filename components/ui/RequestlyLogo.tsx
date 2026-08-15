import * as React from "react";
import { cn } from "@/lib/utils";

interface RequestlyLogoProps {
  /** Target height in pixels or class string (defaults to h-5 / 20px) */
  height?: number;
  className?: string;
  alt?: string;
}

export const RequestlyLogo: React.FC<RequestlyLogoProps> = ({
  height = 20,
  className,
  alt = "Requestly",
}) => {
  return (
    <div className={cn("relative inline-flex items-center shrink-0 select-none", className)}>
      {/* Light Mode Logo: logo-black */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-black.png"
        alt={alt}
        style={{ height: `${height}px`, width: "auto" }}
        className="block dark:hidden object-contain"
      />
      {/* Dark Mode Logo: logo-white */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-white.png"
        alt={alt}
        style={{ height: `${height}px`, width: "auto" }}
        className="hidden dark:block object-contain"
      />
    </div>
  );
};
