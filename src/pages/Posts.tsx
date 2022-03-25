import { FC } from "react"
import menu from "@/modules/posts/menu.posts.json"
import { Link } from "react-router-dom"
import useRipple from "../hooks/useRipple"

const PostLink: FC<{ postItem: PostItem; className?: string }> = (props) => {
  const [addRipple, ripples] = useRipple()

  const postItem = props.postItem
  return (
    <Link
      className="relative overflow-hidden rounded-sm bg-light-outstand py-8 px-4 shadow-sm  transition-colors duration-300 ease-out dark:bg-dark-outstand md:px-8"
      to={`/post?path=${`${postItem.path}${postItem.name}`}`}
      onMouseDown={addRipple}
    >
      <div className="font-wotfard text-xl font-bold" onClick={(e) => addRipple(e)}>
        {postItem.name}
      </div>
      <div className="mt-1 text-xs text-black-secondary/70 dark:text-white-secondary/70">{postItem.commitTime}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: postItem.intro
        }}
        className="mt-2 text-sm text-black-secondary dark:text-white-secondary"
      />
      {ripples}
    </Link>
  )
}

const Posts: FC = () => {
  const types = menu.filter((item) => item.type === "dir")

  return (
    <div className="mx-auto max-w-5xl">
      {types.map((type) => {
        return (
          <div key={type.name} className="px-3">
            <div className="mb-6 mt-8 flex items-end">
              <div className="text-4xl font-bold">{type.name}</div>
              <div className="ml-auto font-bold">
                {type.count}
                {type.count && type.count > 1 ? " articles" : " article"}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {type.children.map((postItem) => (
                <PostLink postItem={postItem} key={`${postItem.path}${postItem.name}`} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Posts
