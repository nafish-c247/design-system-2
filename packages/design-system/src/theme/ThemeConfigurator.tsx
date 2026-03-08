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
  anchor.download = "ui-theme.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ThemeConfigurator() {
  const {
    themeName,
    setTheme,
    config,
    updateSharedConfig,
    updateThemeColors,
    resetSharedConfig,
    resetThemeColors,
    exportConfig,
    importConfig,
  } = useTheme();

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
          shared: config.shared,
          colors: config.colors,
        }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };
      setStatus(payload.message);
    } catch {
      setStatus("Unable to save to project. Use Download JSON in static mode.");
    }
  };

  const activeColors = config.colors[themeName];

  return (
    <div className="ds-stack">
      <div>
        <label className="ds-text-muted">Theme Palette</label>
        <div className="ds-flex" style={{ gap: "0.6rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          {(["default", "dark"] as ThemeName[]).map((name) => (
            <Button key={name} variant={themeName === name ? "primary" : "outline"} onClick={() => setTheme(name)}>
              {name}
            </Button>
          ))}
          <Button variant="ghost" onClick={resetSharedConfig}>Reset Shared Styling</Button>
          <Button variant="ghost" onClick={() => resetThemeColors(themeName)}>Reset {themeName} Colors</Button>
        </div>
      </div>

      <p className="ds-text-muted">Current color palette: <strong>{themeName}</strong></p>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Primary</label>
          <input type="color" value={activeColors.global.colors.primary} onChange={(e) => updateThemeColors(themeName, { global: { colors: { primary: e.target.value } } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Secondary</label>
          <input type="color" value={activeColors.global.colors.secondary} onChange={(e) => updateThemeColors(themeName, { global: { colors: { secondary: e.target.value } } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Success</label>
          <input type="color" value={activeColors.global.colors.success} onChange={(e) => updateThemeColors(themeName, { global: { colors: { success: e.target.value } } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Danger</label>
          <input type="color" value={activeColors.global.colors.danger} onChange={(e) => updateThemeColors(themeName, { global: { colors: { danger: e.target.value } } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Button Background</label>
          <input type="color" value={activeColors.button.background} onChange={(e) => updateThemeColors(themeName, { button: { background: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Top</label>
          <input type="color" value={activeColors.card.backgroundTop} onChange={(e) => updateThemeColors(themeName, { card: { backgroundTop: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Table Header</label>
          <input type="color" value={activeColors.table.headerBg} onChange={(e) => updateThemeColors(themeName, { table: { headerBg: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Radius</label>
          <input type="text" value={config.shared.button.borderRadius} onChange={(e) => updateSharedConfig({ button: { borderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Button Padding</label>
          <input type="text" value={config.shared.button.padding} onChange={(e) => updateSharedConfig({ button: { padding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Radius</label>
          <input type="text" value={config.shared.card.borderRadius} onChange={(e) => updateSharedConfig({ card: { borderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card Padding</label>
          <input type="text" value={config.shared.card.padding} onChange={(e) => updateSharedConfig({ card: { padding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Container Max Width</label>
          <input type="text" value={config.shared.layout.containerMaxWidth} onChange={(e) => updateSharedConfig({ layout: { containerMaxWidth: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card SM Min Height</label>
          <input type="text" value={config.shared.card.sizeSmMinHeight} onChange={(e) => updateSharedConfig({ card: { sizeSmMinHeight: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card MD Min Height</label>
          <input type="text" value={config.shared.card.sizeMdMinHeight} onChange={(e) => updateSharedConfig({ card: { sizeMdMinHeight: e.target.value } })} />
        </div>
        <div className="col-12 col-md-4">
          <label className="ds-text-muted">Card LG Min Height</label>
          <input type="text" value={config.shared.card.sizeLgMinHeight} onChange={(e) => updateSharedConfig({ card: { sizeLgMinHeight: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Modal Radius</label>
          <input type="text" value={config.shared.modal.borderRadius} onChange={(e) => updateSharedConfig({ modal: { borderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Modal Padding</label>
          <input type="text" value={config.shared.modal.padding} onChange={(e) => updateSharedConfig({ modal: { padding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-2">
          <label className="ds-text-muted">Modal SM</label>
          <input type="text" value={config.shared.modal.sizeSmWidth} onChange={(e) => updateSharedConfig({ modal: { sizeSmWidth: e.target.value } })} />
        </div>
        <div className="col-12 col-md-2">
          <label className="ds-text-muted">Modal MD</label>
          <input type="text" value={config.shared.modal.sizeMdWidth} onChange={(e) => updateSharedConfig({ modal: { sizeMdWidth: e.target.value } })} />
        </div>
        <div className="col-12 col-md-2">
          <label className="ds-text-muted">Modal LG</label>
          <input type="text" value={config.shared.modal.sizeLgWidth} onChange={(e) => updateSharedConfig({ modal: { sizeLgWidth: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Input Radius</label>
          <input type="text" value={config.shared.form.inputBorderRadius} onChange={(e) => updateSharedConfig({ form: { inputBorderRadius: e.target.value } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Input Padding</label>
          <input type="text" value={config.shared.form.inputPadding} onChange={(e) => updateSharedConfig({ form: { inputPadding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Input Font Size</label>
          <input type="text" value={config.shared.form.inputFontSize} onChange={(e) => updateSharedConfig({ form: { inputFontSize: e.target.value } })} />
        </div>
        <div className="col-12 col-md-3">
          <label className="ds-text-muted">Input Height</label>
          <input type="text" value={config.shared.form.inputHeight} onChange={(e) => updateSharedConfig({ form: { inputHeight: e.target.value } })} />
        </div>
      </div>

      <div className="row" style={{ rowGap: "0.8rem" }}>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Table Cell Padding</label>
          <input type="text" value={config.shared.table.cellPadding} onChange={(e) => updateSharedConfig({ table: { cellPadding: e.target.value } })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="ds-text-muted">Table Font Size</label>
          <input type="text" value={config.shared.table.fontSize} onChange={(e) => updateSharedConfig({ table: { fontSize: e.target.value } })} />
        </div>
      </div>

      <div className="ds-stack">
        <label className="ds-text-muted">Export UI Theme Config (shared + default/dark colors)</label>
        <textarea value={exported} readOnly rows={12} />
        <div className="ds-flex" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
          <Button variant="outline" onClick={() => downloadConfig(exported)}>Download JSON</Button>
          <Button onClick={saveToProject}>Save To Project Files</Button>
        </div>
      </div>

      <div className="ds-stack">
        <label className="ds-text-muted">Import UI Theme JSON</label>
        <textarea value={rawJson} onChange={(e) => setRawJson(e.target.value)} rows={8} placeholder="Paste config JSON here" />
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
