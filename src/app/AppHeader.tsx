"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@acme/design-system";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/components", label: "Components" },
  { href: "/forms", label: "Forms" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppHeader() {
  const pathname = usePathname();
  const { themeName, setTheme } = useTheme();
  const isDark = themeName === "dark";

  return (
    <header className="ds-nav">
      <div className="container ds-nav-inner">
        <div className="ds-brand">
          <span className="ds-brand-mark" />
          <span>Design System</span>
        </div>
        <nav className="ds-nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                className={`ds-nav-link${active ? " ds-nav-link-active" : ""}`}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="ds-btn ds-btn-outline ds-theme-toggle"
          onClick={() => setTheme(isDark ? "default" : "dark")}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <span className="ds-theme-toggle-icon" aria-hidden="true">
            {isDark ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--ds-primary)" stroke="var(--ds-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a8 8 0 1 0 9 9 7 7 0 0 1-9-9z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
