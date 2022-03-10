import { readdirSync, readFileSync, statSync, writeFile } from "fs"
import { resolve } from "path"
import { IntroTokenTypes } from "../src/modules/posts/constant"
import { md } from "../src/modules/posts/markdown-it"

function getPostsTree(dirPath: string, basePath: string = "/"): Array<PostItem> {
  const list: Array<PostItem> = []
  const files = readdirSync(dirPath)
  for (const file of files) {
    const stat = statSync(resolve(dirPath, file))
    // directory item
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
    }
    // markdown file item
    else if (/\.md$/.test(file)) {
      const str = readFileSync(`${dirPath}/${file}`).toString("utf-8")
      // extra post intro container
      const tokens = md.parse(str, null)
      let intro
      const introStartIdx = tokens.findIndex((token) => token.type === IntroTokenTypes.open)
      if (introStartIdx === -1) {
        intro = ""
      } else {
        intro = md.renderer.render(
          tokens.slice(
            introStartIdx + 1,
            tokens.findIndex((token) => token.type === IntroTokenTypes.close)
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

const targetFile = resolve(__dirname, "../src/modules/posts/menu.posts.json")
const postsDir = resolve(__dirname, "../public/posts")
writeFile(targetFile, JSON.stringify(getPostsTree(postsDir)), {}, (err) => {})
