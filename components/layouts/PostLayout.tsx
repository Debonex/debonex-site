import Loading from "components/common/Loading";
import Keyword from "components/posts/Keyword";
import EyeSvg from "components/svg/Eye.svg";
import usePost from "lib/hooks/useFetch";
import { formatISO } from "lib/utils/format";
import Head from "next/head";
import { FC } from "react";

const PostLayout: FC<{ meta: PostMeta; children: React.ReactNode }> = ({
  meta,
  children,
}) => {
  const [view, viewLoading] = usePost<{ count: number }>("/api/posts/view", {
    category: meta.category,
    fileName: meta.fileName,
  });

  const title = `Debonex | ${meta.title}`;

  return (
    <article className="prose mx-auto max-w-[80ch] break-all px-2 py-8 dark:prose-invert md:py-16">
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={meta.intro ?? title} />
        {/* og */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={meta.intro ?? title} />
        <meta property="og:keywords" content={meta.keywords.join(",")} />
        <meta property="article:published_time" content={meta.create} />
        <meta property="article:modified_time" content={meta.update} />
        <meta property="article:section" content={meta.category} />
        {meta.keywords.map((keyword, idx) => (
          <meta property="article:tag" content={keyword} key={idx} />
        ))}
        <meta
          property="og:url"
          content={`https://www.debonex.site/posts/${
            meta.category
          }/${meta.fileName.replace(/\.mdx$/, "")}`}
          key="og:url"
        />
      </Head>
      <h1 className="mb-4 text-2xl">{meta.title}</h1>
      <div className="mb-4 flex items-center">
        {meta.keywords &&
          meta.keywords.map((keyword, idx) => (
            <Keyword keyword={keyword} className="mr-2" key={idx} />
          ))}
        <div className="ml-auto flex items-center text-sm text-black/70 dark:text-white/70">
          <EyeSvg width={16} height={16} className="mr-1 inline" />
          {viewLoading ? (
            <Loading className="inline text-xs text-primary-main" />
          ) : (
            <span>{view?.count}</span>
          )}
          <span className="px-2">{meta.create && formatISO(meta.create)}</span>
        </div>
      </div>
      {children}
    </article>
  );
};

export default PostLayout;
