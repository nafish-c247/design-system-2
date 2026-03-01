import { ReactNode } from "react";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="ds-tooltip">
      {children}
      <span className="ds-tooltip-bubble">{label}</span>
    </span>
  );
}