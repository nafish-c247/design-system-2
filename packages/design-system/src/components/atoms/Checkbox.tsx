import { InputHTMLAttributes } from "react";

export function Checkbox({
  label,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
  return (
    <label className="ds-checkbox-field">
      <input className="ds-checkbox" type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}