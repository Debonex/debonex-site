import MarkdownIt from "markdown-it"
import MarkdownItContainer from "markdown-it-container"
import Renderer from "markdown-it/lib/renderer"
import Token from "markdown-it/lib/token"

const markdownIt = MarkdownIt()
markdownIt.use(MarkdownItContainer, "intro", {
  validate: (content: string) => content.trim().match(/^intro$/),
  render: (tokens: Token[], idx: number) => {
    if (tokens[idx].nesting === 1) {
      return '<div class="hidden">\n'
    } else {
      return "</div>\n"
    }
  }
})

const renderer = new Renderer()

export { markdownIt as md, renderer }
