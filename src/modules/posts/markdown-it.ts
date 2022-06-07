import MarkdownIt from "markdown-it"
import MarkdownItContainer from "markdown-it-container"

const markdownIt = MarkdownIt()
markdownIt.use(MarkdownItContainer, "intro", {
  validate: (content: string) => content.trim().match(/^intro$/)
})

markdownIt.use(MarkdownItContainer, "react", {
  validate: (content: string) => content.trim().match(/^react\s+(.+)$/)
})

export { markdownIt as md }
