import React from "react";

type Variant = "primary" | "secondary" | "outline" | "destructive";
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
    "bg-background text-foreground border border-primary",
  outline:
    "bg-transparent text-background border border-background",
  destructive:
    "border bg-red-700/70 text-background focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50",
};

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-3 text-base",
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
