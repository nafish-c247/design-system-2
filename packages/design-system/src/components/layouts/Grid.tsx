import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `row ${className}` : "row"}>{children}</div>;
}

export function Col({ children, className }: { children: ReactNode; className: string }) {
  return <div className={className}>{children}</div>;
}