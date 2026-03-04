export type ThemeName = "default" | "dark" | "corporate" | "clientA";

export type ThemeTokens = {
  bg: string;
  bgGrad1: string;
  bgGrad2: string;
  bgGrad3: string;
  surface: string;
  surfaceAlt: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryStrong: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  cardTop: string;
  cardBottom: string;
  navBg: string;
  navLink: string;
  navLinkHoverBg: string;
  navLinkHoverText: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  tableHeadBg: string;
  tableRowHover: string;
  focusRing: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  space4: string;
  space5: string;
  fontSizeBase: string;
  fontSizeSm: string;
  fontSizeLg: string;
  fontWeightRegular: string;
  fontWeightMedium: string;
  fontWeightBold: string;
  buttonRadius: string;
  buttonPadding: string;
  buttonBg: string;
  buttonText: string;
  buttonFontSize: string;
  buttonFontWeight: string;
  cardRadius: string;
  cardShadow: string;
  cardPaddingY: string;
  cardPaddingX: string;
  tableBorderColor: string;
  inputRadius: string;
  inputPadding: string;
  inputBg: string;
  containerMaxWidth: string;
};

export type ThemeConfigMap = Record<ThemeName, ThemeTokens>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type UIThemeConfig = {
  global: {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      surface: string;
      text: string;
      border: string;
    };
    typography: {
      fontSizeBase: string;
      fontSizeSm: string;
      fontSizeLg: string;
      fontWeightRegular: string;
      fontWeightMedium: string;
      fontWeightBold: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  button: {
    borderRadius: string;
    padding: string;
    background: string;
    textColor: string;
    fontSize: string;
    fontWeight: string;
  };
  card: {
    borderRadius: string;
    shadow: string;
    padding: string;
    backgroundTop: string;
    backgroundBottom: string;
  };
  table: {
    headerBg: string;
    rowHover: string;
    borderColor: string;
  };
  form: {
    inputBorderRadius: string;
    inputPadding: string;
    inputBg: string;
  };
  layout: {
    containerMaxWidth: string;
  };
};
