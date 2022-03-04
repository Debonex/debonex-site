import { FunctionComponent } from "react"
import menu from "@/posts/menu.posts.json"
import { Link } from "react-router-dom"

const Posts: FunctionComponent = () => {
  const types = menu.filter((item) => item.type === "dir")
  return (
    <div className="mx-auto max-w-5xl">
      {types.map((type) => {
        return (
          <div>
            <div className="mb-6 ml-4 mt-8 text-4xl font-bold">{type.name}</div>
            <div className="mx-3 grid grid-cols-1 gap-5 md:grid-cols-2">
              {type.children.map((item) => (
                <Link
                  className="bg-light-outstand py-8 px-4 transition-colors duration-300 ease-out dark:bg-dark-outstand  md:px-8"
                  to={`/post?path=${`${item.path}${item.name}`}`}
                  key={`${item.path}${item.name}`}
                >
                  <div className="font-wotfard text-xl font-bold">{item.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Posts
