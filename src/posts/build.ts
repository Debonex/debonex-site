import { readdirSync, statSync, writeFile } from "fs"
import { resolve } from "path"

function getPostsTree(dirPath: string, basePath: string = "/"): Array<PostItem> {
  const list: Array<PostItem> = []
  const files = readdirSync(dirPath)
  for (const file of files) {
    const stat = statSync(resolve(dirPath, file))
    if (stat.isDirectory()) {
      const children = getPostsTree(`${dirPath}/${file}`, `${basePath}${file}/`)
      list.push({
        name: file,
        type: "dir",
        path: basePath,
        children: children,
        count: children.filter((item) => item.type === "md").length
      })
    } else if (/\.md$/.test(file)) {
      list.push({
        name: file.replace(/\.md$/, ""),
        type: "md",
        path: basePath,
        children: []
      })
    }
  }
  return list
}

const targetFile = resolve(__dirname, "menu.posts.json")
const postsDir = resolve(__dirname, "../assets/posts")
writeFile(targetFile, JSON.stringify(getPostsTree(postsDir)), {}, (err) => {})
