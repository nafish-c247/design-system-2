import defaultThemeJson from "../../../../config/themes/default.json";
import darkThemeJson from "../../../../config/themes/dark.json";
import sharedThemeJson from "../../../../config/themes/shared.json";
import { DeepPartial, SharedStyleConfig, ThemeColorConfig, ThemeConfigMap, ThemeName, ThemeTokens, UIThemeConfig } from "./types";

const themeColorConfigs: Record<ThemeName, ThemeColorConfig> = {
  default: defaultThemeJson as ThemeColorConfig,
  dark: darkThemeJson as ThemeColorConfig,
};

const sharedStyleConfig = sharedThemeJson as SharedStyleConfig;

export const themes: ThemeConfigMap = {
  default: {
    bg: "#f2f6fb",
    bgGrad1: "rgba(52, 130, 246, 0.16)",
    bgGrad2: "rgba(12, 176, 149, 0.14)",
    bgGrad3: "#edf3fa",
    surface: "#ffffff",
    surfaceAlt: "#eef3fb",
    surfaceElevated: "#ffffff",
    text: "#132238",
    textMuted: "#5b6a80",
    border: "#d8e2f0",
    primary: "#1161c6",
    primaryStrong: "#0b4eaa",
    secondary: "#64748b",
    accent: "#0f9d88",
    success: "#1f8a4d",
    warning: "#c17a11",
    danger: "#bb2d3b",
    info: "#1d6fbf",
    cardTop: "#ffffff",
    cardBottom: "#fbfdff",
    navBg: "rgba(255, 255, 255, 0.75)",
    navLink: "#26415e",
    navLinkHoverBg: "#ffffff",
    navLinkHoverText: "#132238",
    chipBg: "#eef4ff",
    chipBorder: "#cfe0f8",
    chipText: "#234870",
    tableHeadBg: "#f9fbfe",
    tableRowHover: "#f7faff",
    focusRing: "#cbe0ff",
    radiusSm: "10px",
    radiusMd: "16px",
    radiusLg: "24px",
    space4: "1rem",
    space5: "1.5rem",
    fontSizeBase: "16px",
    fontSizeSm: "14px",
    fontSizeLg: "20px",
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700",
    buttonRadius: "10px",
    buttonPadding: "10px 16px",
    buttonBg: "#1161c6",
    buttonText: "#ffffff",
    buttonFontSize: "14px",
    buttonFontWeight: "700",
    cardRadius: "16px",
    cardShadow: "0 16px 40px rgba(11, 36, 66, 0.12)",
    cardPaddingY: "16px",
    cardPaddingX: "24px",
    tableBorderColor: "#d8e2f0",
    inputRadius: "10px",
    inputPadding: "10px 12px",
    inputBg: "#ffffff",
    inputFontSize: "16px",
    inputHeight: "40px",
    tableCellPaddingY: "14px",
    tableCellPaddingX: "14px",
    tableFontSize: "15px",
    cardSizeSmMinHeight: "120px",
    cardSizeMdMinHeight: "160px",
    cardSizeLgMinHeight: "220px",
    modalRadius: "24px",
    modalPaddingY: "18px",
    modalPaddingX: "20px",
    modalSizeSmWidth: "420px",
    modalSizeMdWidth: "620px",
    modalSizeLgWidth: "860px",
    containerMaxWidth: "1320px"
  },
  dark: {
    bg: "#0f1723",
    bgGrad1: "rgba(73, 120, 255, 0.22)",
    bgGrad2: "rgba(19, 180, 151, 0.2)",
    bgGrad3: "#0b111a",
    surface: "#131c2b",
    surfaceAlt: "#1a2538",
    surfaceElevated: "#1b2637",
    text: "#e8edf7",
    textMuted: "#9eaac0",
    border: "#2a3952",
    primary: "#71a2ff",
    primaryStrong: "#4a7de2",
    secondary: "#94a3b8",
    accent: "#36c6b1",
    success: "#4fc97f",
    warning: "#f0be62",
    danger: "#ff7a84",
    info: "#64b8ff",
    cardTop: "#172132",
    cardBottom: "#121b2a",
    navBg: "rgba(15, 23, 35, 0.84)",
    navLink: "#c3cee0",
    navLinkHoverBg: "#1f2a3f",
    navLinkHoverText: "#ffffff",
    chipBg: "#1b2b45",
    chipBorder: "#31527e",
    chipText: "#b9d2ff",
    tableHeadBg: "#172233",
    tableRowHover: "#1a2638",
    focusRing: "#3b6cb1",
    radiusSm: "10px",
    radiusMd: "16px",
    radiusLg: "24px",
    space4: "1rem",
    space5: "1.5rem",
    fontSizeBase: "16px",
    fontSizeSm: "14px",
    fontSizeLg: "20px",
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700",
    buttonRadius: "10px",
    buttonPadding: "10px 16px",
    buttonBg: "#71a2ff",
    buttonText: "#0f1723",
    buttonFontSize: "14px",
    buttonFontWeight: "700",
    cardRadius: "16px",
    cardShadow: "0 16px 40px rgba(2, 8, 23, 0.5)",
    cardPaddingY: "16px",
    cardPaddingX: "24px",
    tableBorderColor: "#2a3952",
    inputRadius: "10px",
    inputPadding: "10px 12px",
    inputBg: "#1a2538",
    inputFontSize: "16px",
    inputHeight: "40px",
    tableCellPaddingY: "14px",
    tableCellPaddingX: "14px",
    tableFontSize: "15px",
    cardSizeSmMinHeight: "120px",
    cardSizeMdMinHeight: "160px",
    cardSizeLgMinHeight: "220px",
    modalRadius: "24px",
    modalPaddingY: "18px",
    modalPaddingX: "20px",
    modalSizeSmWidth: "420px",
    modalSizeMdWidth: "620px",
    modalSizeLgWidth: "860px",
    containerMaxWidth: "1320px"
  }
};

export const cssVarMap: Record<keyof ThemeTokens, string> = {
  bg: "--ds-bg",
  bgGrad1: "--ds-bg-grad-1",
  bgGrad2: "--ds-bg-grad-2",
  bgGrad3: "--ds-bg-grad-3",
  surface: "--ds-surface",
  surfaceAlt: "--ds-surface-alt",
  surfaceElevated: "--ds-surface-elevated",
  text: "--ds-text",
  textMuted: "--ds-text-muted",
  border: "--ds-border",
  primary: "--ds-primary",
  primaryStrong: "--ds-primary-strong",
  secondary: "--ds-secondary",
  accent: "--ds-accent",
  success: "--ds-success",
  warning: "--ds-warning",
  danger: "--ds-danger",
  info: "--ds-info",
  cardTop: "--ds-card-top",
  cardBottom: "--ds-card-bottom",
  navBg: "--ds-nav-bg",
  navLink: "--ds-nav-link",
  navLinkHoverBg: "--ds-nav-link-hover-bg",
  navLinkHoverText: "--ds-nav-link-hover-text",
  chipBg: "--ds-chip-bg",
  chipBorder: "--ds-chip-border",
  chipText: "--ds-chip-text",
  tableHeadBg: "--ds-table-head-bg",
  tableRowHover: "--ds-table-row-hover",
  focusRing: "--ds-focus-ring",
  radiusSm: "--ds-radius-sm",
  radiusMd: "--ds-radius-md",
  radiusLg: "--ds-radius-lg",
  space4: "--ds-space-4",
  space5: "--ds-space-5",
  fontSizeBase: "--ds-font-size-base",
  fontSizeSm: "--ds-font-size-sm",
  fontSizeLg: "--ds-font-size-lg",
  fontWeightRegular: "--ds-font-weight-regular",
  fontWeightMedium: "--ds-font-weight-medium",
  fontWeightBold: "--ds-font-weight-bold",
  buttonRadius: "--ds-button-radius",
  buttonPadding: "--ds-button-padding",
  buttonBg: "--ds-button-bg",
  buttonText: "--ds-button-text",
  buttonFontSize: "--ds-button-font-size",
  buttonFontWeight: "--ds-button-font-weight",
  cardRadius: "--ds-card-radius",
  cardShadow: "--ds-card-shadow",
  cardPaddingY: "--ds-card-padding-y",
  cardPaddingX: "--ds-card-padding-x",
  tableBorderColor: "--ds-table-border-color",
  inputRadius: "--ds-input-radius",
  inputPadding: "--ds-input-padding",
  inputBg: "--ds-input-bg",
  inputFontSize: "--ds-input-font-size",
  inputHeight: "--ds-input-height",
  tableCellPaddingY: "--ds-table-cell-padding-y",
  tableCellPaddingX: "--ds-table-cell-padding-x",
  tableFontSize: "--ds-table-font-size",
  cardSizeSmMinHeight: "--ds-card-size-sm-min-height",
  cardSizeMdMinHeight: "--ds-card-size-md-min-height",
  cardSizeLgMinHeight: "--ds-card-size-lg-min-height",
  modalRadius: "--ds-modal-radius",
  modalPaddingY: "--ds-modal-padding-y",
  modalPaddingX: "--ds-modal-padding-x",
  modalSizeSmWidth: "--ds-modal-size-sm-width",
  modalSizeMdWidth: "--ds-modal-size-md-width",
  modalSizeLgWidth: "--ds-modal-size-lg-width",
  containerMaxWidth: "--ds-container-max-width"
};

function pxPairToTokens(value: string): { y: string; x: string } {
  const parts = value.trim().split(/\s+/);
  if (parts.length === 1) {
    return { y: parts[0], x: parts[0] };
  }
  return { y: parts[0], x: parts[1] };
}

export function sharedConfigToTokenOverrides(config: SharedStyleConfig): Partial<ThemeTokens> {
  const cardPad = pxPairToTokens(config.card.padding);
  const modalPad = pxPairToTokens(config.modal.padding);
  const tablePad = pxPairToTokens(config.table.cellPadding);

  return {
    fontSizeBase: config.global.typography.fontSizeBase,
    fontSizeSm: config.global.typography.fontSizeSm,
    fontSizeLg: config.global.typography.fontSizeLg,
    fontWeightRegular: config.global.typography.fontWeightRegular,
    fontWeightMedium: config.global.typography.fontWeightMedium,
    fontWeightBold: config.global.typography.fontWeightBold,
    radiusSm: config.global.radius.sm,
    radiusMd: config.global.radius.md,
    radiusLg: config.global.radius.lg,
    space4: config.global.spacing.lg,
    space5: config.global.spacing.xl,
    buttonRadius: config.button.borderRadius,
    buttonPadding: config.button.padding,
    buttonFontSize: config.button.fontSize,
    buttonFontWeight: config.button.fontWeight,
    cardRadius: config.card.borderRadius,
    cardShadow: config.card.shadow,
    cardPaddingY: cardPad.y,
    cardPaddingX: cardPad.x,
    cardSizeSmMinHeight: config.card.sizeSmMinHeight,
    cardSizeMdMinHeight: config.card.sizeMdMinHeight,
    cardSizeLgMinHeight: config.card.sizeLgMinHeight,
    modalRadius: config.modal.borderRadius,
    modalPaddingY: modalPad.y,
    modalPaddingX: modalPad.x,
    modalSizeSmWidth: config.modal.sizeSmWidth,
    modalSizeMdWidth: config.modal.sizeMdWidth,
    modalSizeLgWidth: config.modal.sizeLgWidth,
    tableCellPaddingY: tablePad.y,
    tableCellPaddingX: tablePad.x,
    tableFontSize: config.table.fontSize,
    inputRadius: config.form.inputBorderRadius,
    inputPadding: config.form.inputPadding,
    inputFontSize: config.form.inputFontSize,
    inputHeight: config.form.inputHeight,
    containerMaxWidth: config.layout.containerMaxWidth,
  };
}

export function colorConfigToTokenOverrides(config: ThemeColorConfig): Partial<ThemeTokens> {
  return {
    primary: config.global.colors.primary,
    secondary: config.global.colors.secondary,
    success: config.global.colors.success,
    danger: config.global.colors.danger,
    surface: config.global.colors.surface,
    text: config.global.colors.text,
    border: config.global.colors.border,
    buttonBg: config.button.background,
    buttonText: config.button.textColor,
    cardTop: config.card.backgroundTop,
    cardBottom: config.card.backgroundBottom,
    tableHeadBg: config.table.headerBg,
    tableRowHover: config.table.rowHover,
    tableBorderColor: config.table.borderColor,
    inputBg: config.form.inputBg,
  };
}

function deepMerge<T>(base: T, patch: DeepPartial<T>): T {
  const output = { ...base } as T;
  for (const key of Object.keys(patch) as Array<keyof T>) {
    const patchValue = patch[key];
    if (patchValue === undefined) {
      continue;
    }

    const baseValue = output[key];
    if (
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue) &&
      typeof patchValue === "object" &&
      patchValue !== null &&
      !Array.isArray(patchValue)
    ) {
      output[key] = deepMerge(baseValue, patchValue as DeepPartial<typeof baseValue>) as T[keyof T];
    } else {
      output[key] = patchValue as T[keyof T];
    }
  }

  return output;
}

export function mergeTheme(base: ThemeTokens, overrides: Partial<ThemeTokens>): ThemeTokens {
  return { ...base, ...overrides };
}

export function mergeSharedConfig(base: SharedStyleConfig, patch: DeepPartial<SharedStyleConfig>): SharedStyleConfig {
  return deepMerge(base, patch);
}

export function mergeColorConfig(base: ThemeColorConfig, patch: DeepPartial<ThemeColorConfig>): ThemeColorConfig {
  return deepMerge(base, patch);
}

export function getBaseSharedConfig(): SharedStyleConfig {
  return sharedStyleConfig;
}

export function getBaseColorConfigs(): Record<ThemeName, ThemeColorConfig> {
  return themeColorConfigs;
}

export function createThemeTokens(themeName: ThemeName, shared: SharedStyleConfig, colors: ThemeColorConfig): ThemeTokens {
  const sharedOverrides = sharedConfigToTokenOverrides(shared);
  const colorOverrides = colorConfigToTokenOverrides(colors);
  return mergeTheme(mergeTheme(themes[themeName], sharedOverrides), colorOverrides);
}

export function createUIThemeConfig(shared: SharedStyleConfig, colors: Record<ThemeName, ThemeColorConfig>): UIThemeConfig {
  return { shared, colors };
}
