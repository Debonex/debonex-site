import ThemeButton from "./ThemeButton";
import GithubSvg from "components/svg/Github.svg";
import Name from "./Name";
import Link from "next/link";
import { FC, ReactNode } from "react";
import config from "lib/config";

const Navigator: FC = () => (
  <div className="sticky top-0 bg-light-deep/50 py-2 backdrop-blur-sm dark:bg-dark-deep/50">
    <div className="mx-auto flex max-w-container items-center px-2">
      <Name />
      <NavLink href="/notion">Notion</NavLink>
      <NavLink href="/posts">Posts</NavLink>

      <div className="ml-auto flex">
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
      </div>
    </div>
  </div>
);

const NavLink: FC<{ href: string; children: ReactNode }> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className="ml-4 py-1 text-sm hover:text-sky-500 dark:hover:text-sky-300"
    >
      {children}
    </Link>
  );
};

export default Navigator;
