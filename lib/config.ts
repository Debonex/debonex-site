import siteConfig from "site.config";

export type SiteConfig = {
  notionPageId: string;
  revalidate: number;
  notionCachePath: string;
  githubUrl?: string;
};

type Config = SiteConfig & {
  password: string;
  githubAuth: string;
};

const config: Config = {
  ...siteConfig,
  password: process.env.PASSWORD,
  githubAuth: process.env.GITHUB_AUTH,
};

export default config;
