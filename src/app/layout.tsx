import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ThemeProvider, ThemeSidebarPanel } from "@acme/design-system";
import { AppHeader } from "./AppHeader";
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
        <ThemeProvider defaultTheme="default">
          <div className="ds-shell">
            <AppHeader />
            <div className="ds-main">{children}</div>
          </div>
          <ThemeSidebarPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
