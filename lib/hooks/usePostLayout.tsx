import PostLayout from "components/layouts/PostLayout";
import { ReactNode } from "react";

const usePostLayout = (meta: PostMeta) => {
  const MdxPost = ({ children }: { children: ReactNode }) => (
    <PostLayout meta={meta}>{children}</PostLayout>
  );
  return MdxPost;
};

export default usePostLayout;
