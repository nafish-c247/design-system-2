import { InputHTMLAttributes } from "react";

export function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="ds-stack">
      <span className="ds-text-muted">{label}</span>
      <input className="ds-input" {...props} />
    </label>
  );
}