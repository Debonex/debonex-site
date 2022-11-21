import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

const Keyword: FC<{ keyword: string; className?: string }> = ({
  keyword,
  className,
}) => (
  <Link
    href={`/posts?keyword=${keyword}`}
    className={clsx(
      "rounded-md bg-sky-300 px-2 py-1 text-xs text-primary-main no-underline transition-colors hover:bg-primary-main hover:text-white",
      className
    )}
  >
    {keyword}
  </Link>
);

export default Keyword;
