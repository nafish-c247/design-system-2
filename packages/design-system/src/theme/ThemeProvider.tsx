"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  createThemeTokens,
  createUIThemeConfig,
  cssVarMap,
  getBaseColorConfigs,
  getBaseSharedConfig,
  mergeColorConfig,
  mergeSharedConfig,
} from "./themes";
import { DeepPartial, SharedStyleConfig, ThemeColorConfig, ThemeName, ThemeTokens, UIThemeConfig } from "./types";

type ThemeContextValue = {
  themeName: ThemeName;
  tokens: ThemeTokens;
  config: UIThemeConfig;
  setTheme: (themeName: ThemeName) => void;
  updateSharedConfig: (patch: DeepPartial<SharedStyleConfig>) => void;
  updateThemeColors: (themeName: ThemeName, patch: DeepPartial<ThemeColorConfig>) => void;
  resetSharedConfig: () => void;
  resetThemeColors: (themeName: ThemeName) => void;
  exportConfig: () => string;
  importConfig: (jsonText: string) => { ok: boolean; message: string };
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = "ds-theme-name";
const SHARED_KEY = "ds-ui-theme-shared";
const COLORS_KEY = "ds-ui-theme-colors";

function applyCssVariables(tokens: ThemeTokens) {
  const root = document.documentElement;
  (Object.keys(cssVarMap) as Array<keyof ThemeTokens>).forEach((key) => {
    root.style.setProperty(cssVarMap[key], tokens[key]);
  });
}

function isThemeName(value: string): value is ThemeName {
  return value === "default" || value === "dark";
}

function getStoredTheme(defaultTheme: ThemeName): ThemeName {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (!stored) {
    return defaultTheme;
  }

  if (stored === "light") {
    return "default";
  }

  return isThemeName(stored) ? stored : defaultTheme;
}

function getStoredSharedConfig(): SharedStyleConfig {
  const base = getBaseSharedConfig();
  if (typeof window === "undefined") {
    return base;
  }

  const stored = window.localStorage.getItem(SHARED_KEY);
  if (!stored) {
    return base;
  }

  try {
    return mergeSharedConfig(base, JSON.parse(stored) as DeepPartial<SharedStyleConfig>);
  } catch {
    return base;
  }
}

function getStoredColorConfigs(): Record<ThemeName, ThemeColorConfig> {
  const base = getBaseColorConfigs();
  if (typeof window === "undefined") {
    return base;
  }

  const stored = window.localStorage.getItem(COLORS_KEY);
  if (!stored) {
    return base;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<Record<ThemeName, DeepPartial<ThemeColorConfig>>>;
    return {
      default: mergeColorConfig(base.default, parsed.default ?? {}),
      dark: mergeColorConfig(base.dark, parsed.dark ?? {}),
    };
  } catch {
    return base;
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
}: {
  children: ReactNode;
  defaultTheme?: ThemeName;
}) {
  const [themeName, setThemeName] = useState<ThemeName>(() => getStoredTheme(defaultTheme));
  const [sharedConfig, setSharedConfig] = useState<SharedStyleConfig>(() => getStoredSharedConfig());
  const [colorConfigs, setColorConfigs] = useState<Record<ThemeName, ThemeColorConfig>>(() => getStoredColorConfigs());

  const tokens = useMemo(() => createThemeTokens(themeName, sharedConfig, colorConfigs[themeName]), [themeName, sharedConfig, colorConfigs]);

  useEffect(() => {
    applyCssVariables(tokens);
    window.localStorage.setItem(THEME_KEY, themeName);
    window.localStorage.setItem(SHARED_KEY, JSON.stringify(sharedConfig, null, 2));
    window.localStorage.setItem(COLORS_KEY, JSON.stringify(colorConfigs, null, 2));
  }, [themeName, sharedConfig, colorConfigs, tokens]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      tokens,
      config: createUIThemeConfig(sharedConfig, colorConfigs),
      setTheme: setThemeName,
      updateSharedConfig: (patch) => {
        setSharedConfig((prev) => mergeSharedConfig(prev, patch));
      },
      updateThemeColors: (name, patch) => {
        setColorConfigs((prev) => ({
          ...prev,
          [name]: mergeColorConfig(prev[name], patch),
        }));
      },
      resetSharedConfig: () => {
        setSharedConfig(getBaseSharedConfig());
      },
      resetThemeColors: (name) => {
        const base = getBaseColorConfigs();
        setColorConfigs((prev) => ({ ...prev, [name]: base[name] }));
      },
      exportConfig: () => JSON.stringify(createUIThemeConfig(sharedConfig, colorConfigs), null, 2),
      importConfig: (jsonText) => {
        try {
          const parsed = JSON.parse(jsonText) as DeepPartial<UIThemeConfig>;
          if (parsed.shared) {
            setSharedConfig((prev) => mergeSharedConfig(prev, parsed.shared ?? {}));
          }
          if (parsed.colors) {
            setColorConfigs((prev) => ({
              default: mergeColorConfig(prev.default, parsed.colors?.default ?? {}),
              dark: mergeColorConfig(prev.dark, parsed.colors?.dark ?? {}),
            }));
          }
          return { ok: true, message: "Theme configuration imported." };
        } catch {
          return { ok: false, message: "Invalid JSON. Please provide a valid configuration." };
        }
      },
    }),
    [themeName, tokens, sharedConfig, colorConfigs]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }
  return context;
}