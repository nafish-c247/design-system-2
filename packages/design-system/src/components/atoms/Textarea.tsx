import { TextareaHTMLAttributes } from "react";

export function Textarea({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="ds-stack">
      <span className="ds-text-muted">{label}</span>
      <textarea className="ds-textarea" {...props} />
    </label>
  );
}