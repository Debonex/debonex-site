import { dark, defineStyle, Theme } from "components/profile/styleEngine";

export const getStyles = (theme?: Theme) => {
  const _theme = theme || dark;
  return {
    containerMain: defineStyle({
      fontFamily: '"Segoe UI", Ubuntu, sans-serif',
      backgroundColor: _theme.bgColorMain,
      height: 200,
      color: _theme.colorText,
    }),
    containerHeader: defineStyle({
      height: 40,
      backgroundColor: _theme.bgColorTitle,
      lineHeight: "40px",
      paddingLeft: 20,
      fontSize: 20,
    }),
    containerBody: defineStyle({
      padding: 16,
      display: "grid",
      gridTemplateColumns: "auto minmax(0,1fr) 50%",
    }),
    levelImage: defineStyle({
      animationName: "fade-in",
      animationDuration: "1000ms",
      animationFillMode: "forwards",
    }),
    bodyInfo: defineStyle({
      padding: 16,
    }),
    nickname: defineStyle({
      fontSize: 24,
    }),
    subLevel: defineStyle({
      marginTop: 4,
      fontSize: 16,
    }),
    containerChart: defineStyle({
      animationName: "scale-x-in",
      animationDuration: "700ms",
      animationFillMode: "forwards",
      transformOrigin: "left",
    }),
  };
};
