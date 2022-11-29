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
      display: "grid",
      gridTemplateColumns: "auto minmax(0,1fr) 50%",
      padding: 16,
    }),
    avatarImg: defineStyle({
      borderRadius: 12,
      animationName: "fade-in",
      animationDuration: "1000ms",
      animationFillMode: "forwards",
    }),
    bodyInfo: defineStyle({
      display: "flex",
      flexDirection: "column",
      paddingLeft: 16,
    }),
    username: defineStyle({
      fontSize: 24,
    }),
    bio: defineStyle({
      fontSize: 12,
      marginTop: 4,
    }),
    bodyRight: defineStyle({
      paddingLeft: 16,
      paddingTop: 16,
    }),
    containerBadges: defineStyle({
      display: "flex",
      flexWrap: "wrap",
    }),
    containerBadge: defineStyle({
      display: "flex",
      marginTop: 12,
      minWidth: "50%",
      fontSize: 12,
      alignItems: "center",
    }),
    badge: defineStyle({
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 4,
    }),
    badgeText: defineStyle({
      marginRight: 4,
    }),
    langsBar: defineStyle({
      display: "flex",
      height: "8px",
    }),
  };
};
