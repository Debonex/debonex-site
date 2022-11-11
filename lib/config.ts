import siteConfig from "site.config";

export type SiteConfig = {
  notionPageId: string;
  revalidate: number;
  notionCachePath: string;
};

type Config = SiteConfig & {
  password: string;
};

const config: Config = {
  ...siteConfig,
  password: process.env.PASSWORD,
};

export default config;
