import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type ThemeName = "default" | "dark" | "corporate" | "clientA";

type SaveThemePayload = {
  activeTheme: ThemeName;
  themes: Record<ThemeName, unknown>;
};

function isThemeName(value: string): value is ThemeName {
  return value === "default" || value === "dark" || value === "corporate" || value === "clientA";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<SaveThemePayload>;

    if (!body || !body.activeTheme || !body.themes || !isThemeName(body.activeTheme)) {
      return NextResponse.json({ ok: false, message: "Invalid payload." }, { status: 400 });
    }

    const requiredThemes: ThemeName[] = ["default", "dark", "corporate", "clientA"];
    const hasAllThemes = requiredThemes.every((themeName) => Object.prototype.hasOwnProperty.call(body.themes, themeName));
    if (!hasAllThemes) {
      return NextResponse.json({ ok: false, message: "Theme map must include default, dark, corporate, and clientA." }, { status: 400 });
    }

    const projectRoot = process.cwd();
    const themesDir = path.join(projectRoot, "config", "themes");
    await mkdir(themesDir, { recursive: true });

    for (const themeName of requiredThemes) {
      const filePath = path.join(themesDir, `${themeName}.json`);
      await writeFile(filePath, `${JSON.stringify(body.themes[themeName], null, 2)}\n`, "utf8");
    }

    const mapDescriptor = {
      themes: {
        default: "./themes/default.json",
        dark: "./themes/dark.json",
        corporate: "./themes/corporate.json",
        clientA: "./themes/clientA.json",
      },
      activeTheme: body.activeTheme,
    };

    const uiThemeFile = path.join(projectRoot, "config", "ui-theme.json");
    await writeFile(uiThemeFile, `${JSON.stringify(mapDescriptor, null, 2)}\n`, "utf8");

    return NextResponse.json({ ok: true, message: "Theme files saved to config/themes and config/ui-theme.json." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save theme files.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}