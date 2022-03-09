import axios from "axios"
import { FunctionComponent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/Loading"
import { IntroTokenTypes } from "../modules/markdown/constant"
import { md } from "../modules/markdown/markdown-it"

const Post: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [content, setContent] = useState<string>("")
  const [params] = useSearchParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`/src/assets/posts${params.get("path")}.md`).then((res) => {
      setContent(res.data)
      setLoading(false)
    })
  }, [])

  // remove intro part
  const tokens = md.parse(content, null)
  const introFrom = tokens.findIndex((token) => token.type === IntroTokenTypes.open)
  const introTo = tokens.findIndex((token) => token.type === IntroTokenTypes.close)
  tokens.splice(introFrom, introTo - introFrom + 1)

  return (
    <div className="mx-auto max-w-5xl">
      {loading && (
        <div className="text-primary">
          <Loading width={40} height={40} />
        </div>
      )}
      {!loading && (
        <div className="rounded-md bg-light-outstand px-6 py-12 shadow-md  dark:bg-dark-outstand">
          <article
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: md.renderer.render(tokens, {}, null)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Post
