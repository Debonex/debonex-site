import { clsx } from "clsx";
import Keyword from "components/posts/Keyword";
import EyeSvg from "components/svg/Eye.svg";
import PostManager from "lib/postManager";
import { formatISO } from "lib/utils/format";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps<{
  posts: Record<string, PostInfo[]>;
}> = async () => {
  const postManager = await PostManager.getInstanceAsync();
  const posts = await postManager.getPostMapWithViewCount();

  return {
    props: {
      posts,
    },
  };
};

const Posts: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
  const router = useRouter();
  const keyword = router.query.keyword as string;
  let postTree: Record<string, PostInfo[]> = {};

  if (!keyword) {
    postTree = posts;
  } else {
    const postList = Object.values(posts).flat();
    postList.forEach((post) => {
      if (post.keywords.includes(keyword)) {
        postTree[post.category] = postTree[post.category] || [];
        postTree[post.category].push(post);
      }
    });
  }

  return (
    <div className="mx-auto max-w-container px-2 pt-8 md:pt-16">
      {Object.keys(postTree).map((category) => {
        return (
          <div key={category} className="mb-12">
            <div className="text-2xl font-bold capitalize">{category}</div>
            {postTree[category].map((post, idx) => (
              <Post category={category} post={post} key={idx} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const Post: FC<{ post: PostInfo; category: string }> = ({ post, category }) => {
  const postHref = `/posts/${category}/${post.fileName.replace(".mdx", "")}`;
  return (
    <div
      className={clsx(
        "group mt-6 grid grid-cols-[auto,1fr] rounded-r-md bg-light-deep transition-colors hover:bg-light-deep/50 md:grid-cols-[auto,1fr,1fr]",
        "dark:bg-dark-deep dark:hover:bg-dark-deep/50"
      )}
    >
      <Link href={postHref} className="row-span-2 w-5 select-none">
        <div className="flex h-full w-1 items-center rounded-r-full bg-sky-500 transition-[width] will-change-[width] group-hover:w-5">
          <div className="scale-0 border-4 border-l-[6px] border-transparent border-l-white transition-transform group-hover:translate-x-2 group-hover:scale-100"></div>
        </div>
      </Link>
      <Link href={postHref} className="p-2 md:p-4">
        <div className="text-lg">{post.title}</div>
        <div className="mt-2 text-sm text-black/70 dark:text-white/70">
          {post.intro}
        </div>
      </Link>
      <div className="flex p-2 pt-0 md:block md:p-4">
        <div className="text-sm text-black/70 dark:text-white/70">
          <span className="whitespace-nowrap pr-2">
            <EyeSvg width={16} height={16} className="mr-1 inline" />
            {post.viewCount}
          </span>
          <span className="whitespace-nowrap px-2">
            {formatISO(post.create)}
          </span>
        </div>
        <div className="ml-auto mt-0 flex flex-row-reverse flex-wrap gap-2 md:ml-0 md:mt-2">
          {post.keywords.map((keyword, idx) => (
            <Keyword keyword={keyword} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
