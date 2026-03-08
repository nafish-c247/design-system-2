export type ThemeName = "default" | "dark";

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
  inputFontSize: string;
  inputHeight: string;
  tableCellPaddingY: string;
  tableCellPaddingX: string;
  tableFontSize: string;
  cardSizeSmMinHeight: string;
  cardSizeMdMinHeight: string;
  cardSizeLgMinHeight: string;
  modalRadius: string;
  modalPaddingY: string;
  modalPaddingX: string;
  modalSizeSmWidth: string;
  modalSizeMdWidth: string;
  modalSizeLgWidth: string;
  containerMaxWidth: string;
};

export type ThemeConfigMap = Record<ThemeName, ThemeTokens>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type SharedStyleConfig = {
  global: {
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
    fontSize: string;
    fontWeight: string;
  };
  card: {
    borderRadius: string;
    shadow: string;
    padding: string;
    sizeSmMinHeight: string;
    sizeMdMinHeight: string;
    sizeLgMinHeight: string;
  };
  modal: {
    borderRadius: string;
    padding: string;
    sizeSmWidth: string;
    sizeMdWidth: string;
    sizeLgWidth: string;
  };
  table: {
    cellPadding: string;
    fontSize: string;
  };
  form: {
    inputBorderRadius: string;
    inputPadding: string;
    inputFontSize: string;
    inputHeight: string;
  };
  layout: {
    containerMaxWidth: string;
  };
};

export type ThemeColorConfig = {
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
  };
  button: {
    background: string;
    textColor: string;
  };
  card: {
    backgroundTop: string;
    backgroundBottom: string;
  };
  table: {
    headerBg: string;
    rowHover: string;
    borderColor: string;
  };
  form: {
    inputBg: string;
  };
};

export type UIThemeConfig = {
  shared: SharedStyleConfig;
  colors: Record<ThemeName, ThemeColorConfig>;
};
