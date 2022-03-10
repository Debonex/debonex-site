import MarkdownIt from "markdown-it"
import MarkdownItContainer from "markdown-it-container"

const markdownIt = MarkdownIt()
markdownIt.use(MarkdownItContainer, "intro", {
  validate: (content: string) => content.trim().match(/^intro$/)
})

export { markdownIt as md }
