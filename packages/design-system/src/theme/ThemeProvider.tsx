"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createThemeTokens, cssVarMap, getBaseThemeConfig, mergeUIConfig } from "./themes";
import { DeepPartial, ThemeName, ThemeTokens, UIThemeConfig } from "./types";

type ThemeConfigMap = Record<ThemeName, UIThemeConfig>;

type ThemeContextValue = {
  themeName: ThemeName;
  tokens: ThemeTokens;
  config: UIThemeConfig;
  allThemeConfigs: ThemeConfigMap;
  setTheme: (themeName: ThemeName) => void;
  updateConfig: (patch: DeepPartial<UIThemeConfig>) => void;
  resetCustomizations: () => void;
  exportConfig: () => string;
  importConfig: (jsonText: string) => { ok: boolean; message: string };
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = "ds-theme-name";
const CONFIG_MAP_KEY = "ds-ui-theme-config-map";
const LEGACY_CONFIG_KEY = "ds-ui-theme-config";

function applyCssVariables(tokens: ThemeTokens) {
  const root = document.documentElement;
  (Object.keys(cssVarMap) as Array<keyof ThemeTokens>).forEach((key) => {
    root.style.setProperty(cssVarMap[key], tokens[key]);
  });
}

function isThemeName(value: string): value is ThemeName {
  return value === "default" || value === "dark" || value === "corporate" || value === "clientA";
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
  if (stored === "brand") {
    return "corporate";
  }

  return isThemeName(stored) ? stored : defaultTheme;
}

function getDefaultConfigMap(): ThemeConfigMap {
  return {
    default: getBaseThemeConfig("default"),
    dark: getBaseThemeConfig("dark"),
    corporate: getBaseThemeConfig("corporate"),
    clientA: getBaseThemeConfig("clientA"),
  };
}

function getStoredConfigMap(): ThemeConfigMap {
  const defaults = getDefaultConfigMap();

  if (typeof window === "undefined") {
    return defaults;
  }

  const stored = window.localStorage.getItem(CONFIG_MAP_KEY);
  if (!stored) {
    const legacy = window.localStorage.getItem(LEGACY_CONFIG_KEY);
    if (!legacy) {
      return defaults;
    }

    try {
      const parsedLegacy = JSON.parse(legacy) as DeepPartial<UIThemeConfig>;
      return {
        ...defaults,
        default: mergeUIConfig(defaults.default, parsedLegacy),
      };
    } catch {
      return defaults;
    }
  }

  try {
    const parsed = JSON.parse(stored) as Partial<Record<ThemeName, DeepPartial<UIThemeConfig>>>;
    return {
      default: mergeUIConfig(defaults.default, parsed.default ?? {}),
      dark: mergeUIConfig(defaults.dark, parsed.dark ?? {}),
      corporate: mergeUIConfig(defaults.corporate, parsed.corporate ?? {}),
      clientA: mergeUIConfig(defaults.clientA, parsed.clientA ?? {}),
    };
  } catch {
    return defaults;
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
  const [themeConfigs, setThemeConfigs] = useState<ThemeConfigMap>(() => getStoredConfigMap());

  const currentConfig = themeConfigs[themeName];
  const tokens = useMemo(() => createThemeTokens(themeName, currentConfig), [themeName, currentConfig]);

  useEffect(() => {
    applyCssVariables(tokens);
    window.localStorage.setItem(THEME_KEY, themeName);
    window.localStorage.setItem(CONFIG_MAP_KEY, JSON.stringify(themeConfigs, null, 2));
  }, [themeName, themeConfigs, tokens]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      tokens,
      config: currentConfig,
      allThemeConfigs: themeConfigs,
      setTheme: setThemeName,
      updateConfig: (patch) => {
        setThemeConfigs((prev) => ({
          ...prev,
          [themeName]: mergeUIConfig(prev[themeName], patch),
        }));
      },
      resetCustomizations: () => {
        setThemeConfigs((prev) => ({
          ...prev,
          [themeName]: getBaseThemeConfig(themeName),
        }));
      },
      exportConfig: () => JSON.stringify(themeConfigs, null, 2),
      importConfig: (jsonText) => {
        try {
          const parsed = JSON.parse(jsonText) as Partial<Record<ThemeName, DeepPartial<UIThemeConfig>>> | DeepPartial<UIThemeConfig>;
          if (
            typeof parsed === "object" &&
            parsed !== null &&
            ("default" in parsed || "dark" in parsed || "corporate" in parsed || "clientA" in parsed)
          ) {
            const map = parsed as Partial<Record<ThemeName, DeepPartial<UIThemeConfig>>>;
            setThemeConfigs((prev) => ({
              default: mergeUIConfig(prev.default, map.default ?? {}),
              dark: mergeUIConfig(prev.dark, map.dark ?? {}),
              corporate: mergeUIConfig(prev.corporate, map.corporate ?? {}),
              clientA: mergeUIConfig(prev.clientA, map.clientA ?? {}),
            }));
            return { ok: true, message: "Theme map imported." };
          }

          const single = parsed as DeepPartial<UIThemeConfig>;
          setThemeConfigs((prev) => ({
            ...prev,
            [themeName]: mergeUIConfig(prev[themeName], single),
          }));
          return { ok: true, message: `Theme config imported into ${themeName}.` };
        } catch {
          return { ok: false, message: "Invalid JSON. Please provide a valid theme config or theme map." };
        }
      },
    }),
    [themeName, tokens, currentConfig, themeConfigs]
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
