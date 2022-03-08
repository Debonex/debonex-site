import { readdirSync, readFileSync, statSync, writeFile } from "fs"
import { resolve } from "path"
import { md, renderer } from "../modules/markdown/markdown-it"

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
        count: children.filter((item) => item.type === "md").length,
        intro: ""
      })
    } else if (/\.md$/.test(file)) {
      const str = readFileSync(`${dirPath}/${file}`).toString("utf-8")
      const tokens = md.parse(str, null)

      let intro
      const introStartIdx = tokens.findIndex((token) => token.type === "container_intro_open")
      if (introStartIdx === -1) {
        intro = ""
      } else {
        intro = renderer.render(
          tokens.slice(
            introStartIdx + 1,
            tokens.findIndex((token) => token.type === "container_intro_close")
          ),
          {},
          null
        )
      }
      list.push({
        name: file.replace(/\.md$/, ""),
        type: "md",
        path: basePath,
        children: [],
        intro: intro
      })
    }
  }
  return list
}

const targetFile = resolve(__dirname, "menu.posts.json")
const postsDir = resolve(__dirname, "../assets/posts")
writeFile(targetFile, JSON.stringify(getPostsTree(postsDir)), {}, (err) => {})
