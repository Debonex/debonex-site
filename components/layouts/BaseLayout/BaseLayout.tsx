import { FC, ReactNode } from "react";
import Navigator from "./Navigator";

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr] bg-light-main transition-colors dark:bg-dark-main dark:text-white">
      <Navigator />
      <div className="overflow-auto">{children}</div>
    </div>
  );
};

export default BaseLayout;
