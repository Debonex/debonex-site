import LoadingPage from "components/pages/LoadingPage";
import NotionPage, { NotionPageProps } from "components/pages/NotionPage";
import config from "lib/config";
import { fetchPage, getRootPageMeta, refresh } from "lib/notion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

type NotionDynamicPageProps = NotionPageProps;

export const getStaticProps: GetStaticProps<NotionDynamicPageProps> = async ({
  params,
}) => {
  const rootPageMeta = await getRootPageMeta();

  // https://github.com/vercel/next.js/discussions/34311
  const slug = params.slug ? (params.slug as string[]) : [];
  const url = `/${slug.join("/")}`;
  const pageMeta = rootPageMeta.pageList.find((meta) => meta.url === url);
  if (pageMeta) {
    const recordMap = await fetchPage(pageMeta.uuid);
    return {
      props: {
        recordMap,
        rootPageUuid: rootPageMeta.uuid,
        urlMap: rootPageMeta.urlMap,
      },
      revalidate: config.revalidate,
    };
  }
  return {
    notFound: true,
    revalidate: config.revalidate,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NODE_ENV === "production") {
    await refresh();
  }

  const rootPageMeta = await getRootPageMeta();
  if (rootPageMeta) {
    return {
      paths: rootPageMeta.pageList.map((page) => ({
        params: { slug: page.slug },
      })),
      fallback: true,
    };
  }

  return {
    paths: [],
    fallback: true,
  };
};

const NotionDynamicPage: NextPage<NotionDynamicPageProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <LoadingPage />;
  }
  return <NotionPage {...props} />;
};

export default NotionDynamicPage;
