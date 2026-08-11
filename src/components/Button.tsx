"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SimpleButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  className = "",
  type = "button",
  onClick,
}: SimpleButtonProps) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}