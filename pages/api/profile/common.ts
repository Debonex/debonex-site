import { dark, light } from "components/profile/styleEngine";
import { NextApiRequest } from "next";

export const getTheme = (req: NextApiRequest) => {
  const themeQuery = req.query.theme as string;
  let theme = dark;
  if (themeQuery === "light") {
    theme = light;
  }
  return theme;
};
