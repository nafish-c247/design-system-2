"use client";

import { useEffect, useState } from "react";
import { ThemeConfigurator } from "./ThemeConfigurator";

export function ThemeSidebarPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <>
      <button className="ds-theme-fab" onClick={() => setOpen(true)} type="button">
        Customize UI
      </button>

      {open ? (
        <div className="ds-theme-sidebar-overlay" onClick={() => setOpen(false)} role="presentation">
          <aside
            className="ds-theme-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="UI Configuration Panel"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="ds-theme-sidebar-header">
              <h3 className="ds-title-sm">UI Configuration</h3>
              <button className="ds-btn ds-btn-ghost" onClick={() => setOpen(false)} type="button">
                Close
              </button>
            </header>
            <div className="ds-theme-sidebar-body">
              <ThemeConfigurator />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
