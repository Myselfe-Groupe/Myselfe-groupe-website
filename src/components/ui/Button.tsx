import React from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center rounded-sm transition-colors focus:outline-none disabled:opacity-50 cursor-pointer";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-primary text-background",
  secondary:
    "bg-secondary text-background",
  outline:
    "bg-transparent text-background border border-border",
};

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [base, variantMap[variant], sizeMap[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      <span className="absolute inset-1 border border-border rounded-xs pointer-events-none" />
      <span className="relative z-10 inline-flex flex-col items-center justify-center">
        <span>{children}</span>
        <span className="absolute bottom-0 h-[0.05rem] w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
    </button>
  );
}
