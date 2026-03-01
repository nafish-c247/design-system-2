import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Space_Grotesk } from "next/font/google";
import "../../packages/design-system/src/styles.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Design System",
  description: "Framework-free Next.js design system with reusable multi-file architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <div className="ds-shell">
          <header className="ds-nav">
            <div className="container ds-nav-inner">
              <div className="ds-brand">
                <span className="ds-brand-mark" />
                <span>Acme Design System</span>
              </div>
              <nav className="ds-nav-links">
                <Link className="ds-nav-link" href="/">Home</Link>
                <Link className="ds-nav-link" href="/dashboard">Dashboard</Link>
                <Link className="ds-nav-link" href="/components">Components</Link>
                <Link className="ds-nav-link" href="/forms">Forms</Link>
              </nav>
              <span className="ds-chip">Enterprise Ready</span>
            </div>
          </header>
          <div className="ds-main">{children}</div>
        </div>
      </body>
    </html>
  );
}