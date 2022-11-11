import { debug } from "debug";
import Cache from "lib/cache";
import config from "lib/config";
import { NotionAPI } from "notion-client";
import { getAllPagesInSpace, getPageTitle, idToUuid } from "notion-utils";

const log = debug("site:notion");
const cache = new Cache(config.notionCachePath);
const CACHE_ROOT_KEY = "rootPageMeta";
export const notionClient = new NotionAPI();

export type PageMeta = {
  uuid: string;
  title: string;
  name: string;
  url: string;
  slug: string[];
  children: PageMeta[];
};

export type RootPageMeta = {
  pageList: PageMeta[];
  pageTree: PageMeta;
  uuid: string;
  // uuid to url
  urlMap: Record<string, string>;
};

export const fetchPage = async (pageId: string) => {
  log(`get page: ${pageId}`);
  return await notionClient.getPage(pageId);
};

export const refresh = async () => {
  const rootUuid = idToUuid(config.notionPageId);
  log(`refresh root page: ${rootUuid}`);
  const allPages = await getAllPagesInSpace(
    config.notionPageId,
    undefined,
    fetchPage
  );

  const rootPageMeta: RootPageMeta = {
    pageList: [],
    pageTree: null,
    uuid: rootUuid,
    urlMap: {},
  };

  const getBlock = (uuid: string) => {
    const recordMap = allPages[uuid];
    if (recordMap) {
      return recordMap.block[uuid].value;
    }
    return undefined;
  };

  const generatePageMeta = (uuid: string, prevSlug?: string[]): PageMeta => {
    const title = getPageTitle(allPages[uuid]);
    const name = title.toLowerCase();
    const slug = prevSlug ? [...prevSlug, name] : [];
    const url = `/${slug.join("/")}`;
    const children = (getBlock(uuid).content ?? [])
      .filter((childUuid) => getBlock(childUuid)?.type === "page")
      .map((childUuid) => generatePageMeta(childUuid, slug));

    const pageMeta = { uuid, title, name, slug, url, children };
    rootPageMeta.pageList.push(pageMeta);
    rootPageMeta.urlMap[uuid] = url;
    return pageMeta;
  };

  rootPageMeta.pageTree = generatePageMeta(rootUuid);

  await cache.put(CACHE_ROOT_KEY, JSON.stringify(rootPageMeta));
};

export const getRootPageMeta = async () => {
  const buffer = await cache.get(CACHE_ROOT_KEY);
  if (!buffer) {
    return undefined;
  }
  return JSON.parse(buffer.data.toString()) as RootPageMeta;
};
