import { CSSProperties } from "react";

export type Theme = {
  colorText: string;
  bgColorMain: string;
  bgColorTitle: string;
  dark: boolean;
};

export const dark: Theme = {
  colorText: "#e4e2e2",
  bgColorMain: "#171a1c",
  bgColorTitle: "#1f292e",
  dark: true,
};

export const light: Theme = {
  colorText: "#171717",
  bgColorMain: "#fffefe",
  bgColorTitle: "#f5f5f5",
  dark: false,
};

export const defineStyle = (style: CSSProperties) => style;
