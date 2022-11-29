import { CSSProperties } from "react";

export type Theme = {
  colorText: string;
  bgColorMain: string;
  bgColorTitle: string;
};

export const dark: Theme = {
  colorText: "#e4e2e2",
  bgColorMain: "#171a1c",
  bgColorTitle: "#1f292e",
};

export const defineStyle = (style: CSSProperties) => style;
