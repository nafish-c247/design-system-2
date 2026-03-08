import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type ThemeName = "default" | "dark";

type SaveThemePayload = {
  activeTheme: ThemeName;
  shared: unknown;
  colors: Record<ThemeName, unknown>;
};

function isThemeName(value: string): value is ThemeName {
  return value === "default" || value === "dark";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<SaveThemePayload>;

    if (!body || !body.activeTheme || !body.shared || !body.colors || !isThemeName(body.activeTheme)) {
      return NextResponse.json({ ok: false, message: "Invalid payload." }, { status: 400 });
    }

    const requiredThemes: ThemeName[] = ["default", "dark"];
    const hasAllThemes = requiredThemes.every((themeName) => Object.prototype.hasOwnProperty.call(body.colors, themeName));
    if (!hasAllThemes) {
      return NextResponse.json({ ok: false, message: "Theme colors must include default and dark." }, { status: 400 });
    }

    const projectRoot = process.cwd();
    const themesDir = path.join(projectRoot, "config", "themes");
    await mkdir(themesDir, { recursive: true });

    await writeFile(path.join(themesDir, "shared.json"), `${JSON.stringify(body.shared, null, 2)}\n`, "utf8");
    await writeFile(path.join(themesDir, "default.json"), `${JSON.stringify(body.colors.default, null, 2)}\n`, "utf8");
    await writeFile(path.join(themesDir, "dark.json"), `${JSON.stringify(body.colors.dark, null, 2)}\n`, "utf8");

    const mapDescriptor = {
      themes: {
        default: "./themes/default.json",
        dark: "./themes/dark.json"
      },
      shared: "./themes/shared.json",
      activeTheme: body.activeTheme,
    };

    const uiThemeFile = path.join(projectRoot, "config", "ui-theme.json");
    await writeFile(uiThemeFile, `${JSON.stringify(mapDescriptor, null, 2)}\n`, "utf8");

    return NextResponse.json({ ok: true, message: "Shared/default/dark theme files saved." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save theme files.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}