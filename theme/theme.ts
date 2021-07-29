import { get } from "lodash";

const theme = {
  light: {
    bg: {
      0: "#8f8f8f",
      1: "#2d2f36",
      2: "#fff",
    },
    color: {
      0: "#000",
    },
  },
  dark: {
    bg: {
      0: "#484d57",
      1: "#2d2f36",
      2: "#1f1e1e",
    },
    color: {
      0: "#fff",
    },
  },
};

export const getTheme = (path: string, fallback?: any) =>
  get(theme, path, fallback) || fallback || null;

export default theme;
