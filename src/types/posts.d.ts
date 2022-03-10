type PostItem = {
  type: "md" | "dir"
  name: string
  path: string
  children: Array<PostItem>
  count?: number
  intro: string
}

declare module "*.posts.json" {
  const list: Array<PostItem>
  export default list
}
