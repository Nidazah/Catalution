"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-1.5 pl-3 pr-5 text-xs",
  md: "py-2 pl-3 pr-7 text-sm",
  lg: "py-2.5 pl-3.5 pr-8 text-base",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  type = "button",
  target,
  rel,
  disabled = false,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center overflow-hidden rounded-full font-semibold transition-colors duration-300";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-accent text-white",
    outline:
      "bg-transparent text-primary border border-border hover:border-accent",
    ghost: "bg-transparent text-primary hover:text-accent",
  };

  const showFill = variant === "primary" || variant === "secondary";

  const content = (
    <>
      {showFill && (
        <span
          aria-hidden
          className={`absolute inset-y-0 left-3 z-0 my-auto rounded-full transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] ${iconSizeStyles[size]} ${
            variant === "primary" ? "bg-accent" : "bg-primary-dark"
          }`}
        />
      )}

      {icon && showFill && (
        <span
          className={`relative z-10 flex shrink-0 items-center justify-center ${iconSizeStyles[size]}`}
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}

      <span
        className={`relative z-10 flex items-center ${
          icon && showFill ? "ml-3" : ""
        } ${!showFill ? "transition-colors duration-300" : ""}`}
      >
        {children}
      </span>
    </>
  );

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${
    !showFill ? "hover:opacity-90" : ""
  } ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} data-cursor-hover className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor-hover
      className={classes}
    >
      {content}
    </button>
  );
}