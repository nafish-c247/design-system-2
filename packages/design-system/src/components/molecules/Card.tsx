import { ReactNode } from "react";

export function Card({
  title,
  subtitle,
  children,
  footer,
  size = "md",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <section className={`ds-card ds-card-size-${size}`}>
      {(title || subtitle) && (
        <header className="ds-card-header">
          {title && <h3 className="ds-title-sm ds-mb-1">{title}</h3>}
          {subtitle && <p className="ds-text-muted">{subtitle}</p>}
        </header>
      )}
      <div className="ds-card-body">{children}</div>
      {footer ? <footer className="ds-card-footer">{footer}</footer> : null}
    </section>
  );
}
