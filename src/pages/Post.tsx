import axios from "axios"
import { FunctionComponent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "../components/Loading"
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

  return (
    <div className="mx-auto max-w-5xl">
      {loading && (
        <div className="text-primary">
          <Loading width={40} height={40} />
        </div>
      )}
      {!loading && (
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(content)
          }}
        />
      )}
    </div>
  )
}

export default Post
