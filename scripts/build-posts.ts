import { readdirSync, readFileSync, statSync, writeFile } from "fs"
import { resolve } from "path"
import { spawnSync } from "child_process"
import { IntroTokenTypes } from "../src/modules/posts/constant"
import { md } from "../src/modules/posts/markdown-it"

// prepend zero
function pz(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

function getLastCommitTime(fullPath: string): string {
  const commitDateStr = spawnSync("git", ["log", "-1", "--format=%cd", fullPath]).output.toString()
  const date = new Date(commitDateStr)
  return `${date.getFullYear()}-${pz(date.getMonth() + 1)}-${pz(date.getDate())} ${pz(date.getHours())}:${pz(
    date.getMinutes()
  )}:${pz(date.getSeconds())}`
}

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
        intro: "",
        commitTime: getLastCommitTime(`${dirPath}/${file}`)
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
        intro: intro,
        commitTime: getLastCommitTime(`${dirPath}/${file}`)
      })
    }
  }
  return list
}

const targetFile = resolve(__dirname, "../src/modules/posts/menu.posts.json")
const postsDir = resolve(__dirname, "../public/posts")
writeFile(targetFile, JSON.stringify(getPostsTree(postsDir)), {}, (err) => {})
