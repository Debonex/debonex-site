import { readdir } from "fs/promises";
import prisma from "lib/prisma";
import { resolve } from "path";
import { cwd } from "process";

const POSTS_DIR = resolve(cwd(), "pages", "posts");

export default class PostManager {
  private postList: PostMeta[] = [];
  private postMap: Record<string, PostMeta[]> = {};
  private static instance: PostManager;

  private constructor() {}

  public static async getInstanceAsync() {
    if (!this.instance) {
      this.instance = await this.createAsync();
    }
    return this.instance;
  }

  private static async createAsync() {
    const postManager = new PostManager();

    const categories = (await readdir(resolve(POSTS_DIR))).filter(
      // post list page should not be included in the post list
      (category) => category !== "index.tsx"
    );

    for (const category of categories) {
      const files = await readdir(resolve(POSTS_DIR, category));
      postManager.postMap[category] = [];
      for (const fileName of files) {
        const mdxModule: { meta: PostMeta } = await import(
          `pages/posts/${category}/${fileName}`
        );

        postManager.postList.push(mdxModule.meta);
        postManager.postMap[category].push(mdxModule.meta);
      }
    }

    return postManager;
  }

  public getPostList() {
    return this.postList;
  }

  public getPostMap() {
    return this.postMap;
  }

  public async getPostMapWithViewCount() {
    const result: Record<string, PostInfo[]> = {};
    // TODO is there a more efficient way to get posts view count?
    for (const category in this.postMap) {
      result[category] = [];
      for (const postInfo of this.postMap[category]) {
        const viewCount = await this.getPostViewCount(
          category,
          postInfo.fileName
        );
        result[category].push({
          ...postInfo,
          viewCount,
        });
      }
    }
    return result;
  }

  public async getPostViewCount(category: string, fileName: string) {
    const postView = await prisma.view.findFirst({
      where: {
        post: `${category}/${fileName}`,
      },
    });
    return postView ? postView.count : 0;
  }
}
