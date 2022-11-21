import ThemeButton from "./ThemeButton";
import GithubSvg from "components/svg/Github.svg";
import SyncSvg from "components/svg/Sync.svg";
import Name from "./Name";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import config from "lib/config";
import NotionSyncModal from "./NotionSyncModal";

const Navigator: FC = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="sticky top-0 bg-light-deep/50 py-2 backdrop-blur-sm dark:bg-dark-deep/50">
      <div className="mx-auto flex max-w-container items-center px-2">
        <Name />
        <NavLink href="/notes">Notes</NavLink>
        <NavLink href="/posts">Posts</NavLink>

        <div className="ml-auto flex items-center">
          {config.githubUrl && (
            <GithubSvg
              height={24}
              width={24}
              className="cursor-pointer p-px hover:text-black/70 dark:text-white/70 dark:hover:text-white"
              onClick={() => {
                window.open(config.githubUrl, "_blank");
              }}
            />
          )}

          <ThemeButton
            className="ml-2 hover:text-black/70 dark:text-white/70 dark:hover:text-white"
            id="pc"
          />

          <SyncSvg
            onClick={() => setModalShow(true)}
            className="ml-3 h-5 w-5 cursor-pointer fill-current p-px hover:text-black/70 dark:text-white/70 dark:hover:text-white"
          />
        </div>
      </div>

      <NotionSyncModal isOpen={modalShow} onClose={() => setModalShow(false)} />
    </div>
  );
};

const NavLink: FC<{ href: string; children: ReactNode }> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className="ml-4 py-1 text-sm hover:text-primary-main dark:hover:text-sky-300"
    >
      {children}
    </Link>
  );
};

export default Navigator;
