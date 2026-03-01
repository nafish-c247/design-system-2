import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonVariant } from "../../types";

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
}) {
  return (
    <button className={`ds-btn ds-btn-${variant}`} {...props}>
      {children}
    </button>
  );
}