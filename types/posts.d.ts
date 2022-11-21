// meta defined in mdx files
type PostMeta = {
  title: string;
  intro?: string;
  create: string;
  update: string;
  category: string;
  fileName: string;
  keywords: string[];
};

// full post information
type PostInfo = PostMeta & {
  viewCount: number;
};

declare module "*.mdx" {
  const meta: PostMeta;
  export { meta };
}
