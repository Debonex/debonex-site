import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/Loading"
import { IntroTokenTypes } from "../modules/posts/constant"
import { md } from "../modules/posts/markdown-it"

const Post: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [content, setContent] = useState<string>("")
  const [params] = useSearchParams()

  const path = params.get("path")
  useEffect(() => {
    setLoading(true)
    axios.get(`/posts${path}.md`).then((res) => {
      setContent(res.data)
      setLoading(false)
    })
  }, [])

  const title = path?.substring(path.lastIndexOf("/") + 1)
  let articleHtml = ""
  if (content) {
    const tokens = md.parse(content, null)
    const indexOfType = (type: string): number => {
      return tokens.findIndex((token) => token.type === type)
    }
    // remove intro part
    const introFrom = indexOfType(IntroTokenTypes.open),
      introTo = indexOfType(IntroTokenTypes.close)
    tokens.splice(introFrom, introTo - introFrom + 1)

    articleHtml = md.renderer.render(tokens, {}, null)
  }

  return (
    <div className="mx-auto max-w-5xl">
      {loading && (
        <div className="text-primary">
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
          <article
            className="prose px-6 py-12 dark:prose-invert "
            dangerouslySetInnerHTML={{
              __html: articleHtml
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Post
