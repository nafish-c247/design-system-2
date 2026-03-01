import { ReactNode } from "react";
import { BadgeTone } from "../../types";

export function Badge({
  tone = "info",
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return <span className={`ds-badge ds-badge-${tone}`}>{children}</span>;
}