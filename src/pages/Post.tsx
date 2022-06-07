import axios from "axios"
import Token from "markdown-it/lib/token"
import { FC, ReactElement, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/Loading"
import { IntroTokenTypes, ReactTokenTypes } from "../modules/posts/constant"
import { md } from "../modules/posts/markdown-it"

const globComponents = import.meta.glob("../components/**/*.tsx")

const Post: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [content, setContent] = useState<ReactElement[]>([])
  const [params] = useSearchParams()

  const path = params.get("path")
  useEffect(() => {
    setLoading(true)
    axios.get(`/posts${path}.md`).then((res) => {
      render(res.data)
      setLoading(false)
    })
  }, [])

  const title = path?.substring(path.lastIndexOf("/") + 1)

  const render = async (content: string) => {
    const articleContent: ReactElement[] = []
    const tokens = md.parse(content, null)

    let state = "content"
    // temp token list
    let temp: Token[] = []
    for (const token of tokens) {
      switch (token.type) {
        case IntroTokenTypes.open:
          state = "intro"
          if (temp.length) {
            articleContent.push(
              <div
                key={articleContent.length}
                dangerouslySetInnerHTML={{ __html: md.renderer.render(temp, {}, null) }}
              />
            )
            temp = []
          }

          break
        case IntroTokenTypes.close:
          state = "content"
          break
        case ReactTokenTypes.open:
          const match = token.info.trim().match(/^react\s+(.+)$/)
          if (match) {
            const componentPath = `../components/${match[1]}.tsx`
            const Component: FC = (await globComponents[componentPath]()).default
            articleContent.push(<Component key={articleContent.length} />)
          }
          break
        case ReactTokenTypes.close:
          break
        default:
          if (state === "content") {
            temp.push(token)
          }
          break
      }
    }
    if (temp.length) {
      articleContent.push(
        <div key={articleContent.length} dangerouslySetInnerHTML={{ __html: md.renderer.render(temp, {}, null) }}></div>
      )
    }
    setContent(articleContent)
  }

  return (
    <div className="mx-auto max-w-5xl">
      {loading && (
        <div className="mt-40 flex justify-center text-primary">
          <Loading width={40} height={40} />
        </div>
      )}
      {!loading && (
        <div className="rounded-md bg-light-outstand shadow-md dark:bg-dark-outstand">
          <div className="relative h-24 rounded-t-md bg-post-header bg-cover transition-all duration-300 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-light/60 hover:bg-[left_top_-1rem] dark:before:bg-dark/60">
            <div className="absolute ml-6 mt-8 font-wotfard text-4xl font-extrabold text-black dark:text-white">
              {title}
            </div>
          </div>
          <article className="prose max-w-none px-6 py-12 dark:prose-invert">{content}</article>
        </div>
      )}
    </div>
  )
}

export default Post
