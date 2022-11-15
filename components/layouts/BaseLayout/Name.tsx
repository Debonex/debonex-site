import Favicon from "components/common/Favicon";
import Link from "next/link";
import { FC, useState } from "react";

const Name: FC = () => {
  const [T, setT] = useState(true);
  return (
    <Link
      href="/"
      className="flex select-none items-center"
      onMouseEnter={() => setT(false)}
      onMouseLeave={() => setT(true)}
    >
      <Favicon className="mr-px w-5" />
      <span className="-mr-1 text-xl font-bold tracking-widest">ebone</span>
      <svg
        viewBox="0 0 180 180"
        stroke="currentColor"
        width={22}
        height={22}
        fill="transparent"
        style={{
          transform: T
            ? "translateY(0px) scale(1) rotate(0deg)"
            : "translateY(1.5px) scale(0.9) rotate(-90deg)",
        }}
        className="text-sky-500 transition-all"
      >
        <path
          d="M40,70 L140,70 A30,30,0,0,1,140,140 L40,40 A15,15,0,0,0,40,70"
          strokeWidth={30}
          strokeDasharray={T ? "65 312.8" : "113.1 269.7"}
          strokeDashoffset={T ? -20 : -224.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 will-change-[stroke-dashoffset,stroke-dasharray,transform]"
        />
        <path
          d="M90,40 L90,120 A20,20,0,0,0,130,120 L130,50 L50,130 L50,40 A20,20,0,0,1,90,40"
          strokeWidth={30}
          strokeDasharray={T ? "142.8 336" : "113.1 365.7"}
          strokeDashoffset={T ? 0 : -212.8}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="transition-all duration-500 will-change-[stroke-dashoffset,stroke-dasharray,transform]"
        />
      </svg>
    </Link>
  );
};

export default Name;
