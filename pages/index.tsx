import Favicon from "components/common/Favicon";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <div className="mx-auto flex h-full max-w-container items-center justify-center px-2">
      <Favicon className="h-56 w-56 md:h-72 md:w-72" />
    </div>
  );
};

export default Index;
