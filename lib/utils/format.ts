export const formatISO = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("zh-CN").replace(/\//g, "-");
  // return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
