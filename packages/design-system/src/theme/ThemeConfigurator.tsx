"use client";

import { useState } from "react";
import { Button } from "../components/atoms/Button";
import { useTheme } from "./ThemeProvider";
import { ThemeName } from "./types";

function downloadConfig(content: string) {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "theme-map.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ThemeConfigurator() {
  const { themeName, setTheme, config, updateConfig, resetCustomizations, exportConfig, importConfig, allThemeConfigs } = useTheme();
  const [rawJson, setRawJson] = useState("");
  const [status, setStatus] = useState("");

  const exported = exportConfig();

  const saveToProject = async () => {
    try {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const basePath = pathname.startsWith("/design-system-2") ? "/design-system-2" : "";

      const response = await fetch(`${basePath}/api/theme/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeTheme: themeName,
          themes: allThemeConfigs,
        }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };
      setStatus(payload.message);
    } catch {
      setStatus("Unable to save to project. If running static export, use Download Theme Map JSON.");
    }
  };

  return (
    <div className="ds-stack">
      <div>
        <label className="ds-text-muted">Theme Preset</label>
        <div className="ds-flex" style={{ gap: "0.6rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          {(["default", "dark", "corporate", "clientA"] as ThemeName[]).map((name) => (
            <Button key={name} variant={themeName === name ? "primary" : "outline"} onClick={() => setTheme(name)}>
              {name}
            </Button>
          ))}
          <Button variant="ghost" onClick={resetCustomizations}>Reset Current Theme</Button>
        </div>
      </div>

      <p className="ds-text-muted">Editing theme: <strong>{themeName}</strong></p>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Primary</label>
          <input
            type="color"
            value={config.global.colors.primary}
            onChange={(e) => updateConfig({ global: { colors: { primary: e.target.value } } })}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Secondary</label>
          <input
            type="color"
            value={config.global.colors.secondary}
            onChange={(e) => updateConfig({ global: { colors: { secondary: e.target.value } } })}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Success</label>
          <input
            type="color"
            value={config.global.colors.success}
            onChange={(e) => updateConfig({ global: { colors: { success: e.target.value } } })}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Danger</label>
          <input
            type="color"
            value={config.global.colors.danger}
            onChange={(e) => updateConfig({ global: { colors: { danger: e.target.value } } })}
          />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Radius</label>
          <input type="text" value={config.button.borderRadius} onChange={(e) => updateConfig({ button: { borderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Padding</label>
          <input type="text" value={config.button.padding} onChange={(e) => updateConfig({ button: { padding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Background</label>
          <input type="color" value={config.button.background} onChange={(e) => updateConfig({ button: { background: e.target.value } })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Text Color</label>
          <input type="color" value={config.button.textColor} onChange={(e) => updateConfig({ button: { textColor: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Radius</label>
          <input type="text" value={config.card.borderRadius} onChange={(e) => updateConfig({ card: { borderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Shadow</label>
          <input type="text" value={config.card.shadow} onChange={(e) => updateConfig({ card: { shadow: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Padding</label>
          <input type="text" value={config.card.padding} onChange={(e) => updateConfig({ card: { padding: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Table Header BG</label>
          <input type="color" value={config.table.headerBg} onChange={(e) => updateConfig({ table: { headerBg: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Table Row Hover</label>
          <input type="color" value={config.table.rowHover} onChange={(e) => updateConfig({ table: { rowHover: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Table Border</label>
          <input type="color" value={config.table.borderColor} onChange={(e) => updateConfig({ table: { borderColor: e.target.value } })} />
        </div>
      </div>

      <div className="ds-stack">
        <label className="ds-text-muted">Export Theme Map (commit to Git under config/themes)</label>
        <textarea value={exported} readOnly rows={12} />
        <div className="ds-flex" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
          <Button variant="outline" onClick={() => downloadConfig(exported)}>Download Theme Map JSON</Button>
          <Button onClick={saveToProject}>Save To Project Files</Button>
        </div>
      </div>

      <div className="ds-stack">
        <label className="ds-text-muted">Import Theme Config (single theme JSON or theme map JSON)</label>
        <textarea value={rawJson} onChange={(e) => setRawJson(e.target.value)} rows={8} placeholder="Paste theme JSON here" />
        <div className="ds-flex" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
          <Button
            onClick={() => {
              const result = importConfig(rawJson);
              setStatus(result.message);
            }}
          >
            Apply JSON
          </Button>
          {status ? <span className="ds-text-muted">{status}</span> : null}
        </div>
      </div>
    </div>
  );
}
