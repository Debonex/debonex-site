import { SiteConfig } from "lib/config";

const siteConfig: SiteConfig = {
  // notion root id
  notionPageId: "8a11ee7c68d2425d8075651503cde397",
  // seconds of revalidate interval
  revalidate: 30,
  // where to cache notion info
  notionCachePath: "./.site-cache/notion",
};

export default siteConfig;
