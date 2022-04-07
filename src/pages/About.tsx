import React, { FC } from "react"
import { ReactComponent as GithubSvg } from "@/assets/svg/github.svg"
import { ReactComponent as OsuSvg } from "@/assets/svg/osu.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svg/twitter.svg"
import clsx from "clsx"

const openTab = (url: string) => {
  window.open(url, "_blank")
}

const SvgLink: FC<{ component: React.ReactNode; className?: string; url: string }> = (props) => {
  return (
    <div
      className={clsx([
        "h-12 w-12 scale-0 cursor-pointer fill-gray-400 opacity-0 transition-all duration-300 ease-in hover:fill-primary group-hover:scale-100 group-hover:opacity-100",
        props.className
      ])}
      onClick={() => openTab(props.url)}
    >
      {props.component}
    </div>
  )
}

const About: FC = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center pt-40">
      <div className="group relative rounded-full bg-light-outstand p-20 transition-colors dark:bg-dark-outstand">
        <div className="relative h-44 w-44 rounded-full bg-gray-400 transition-transform duration-300 will-change-transform clip-profile group-hover:scale-105">
          <img
            src="/images/profile.svg"
            className="absolute -top-8 transition-transform duration-300 will-change-transform group-hover:-translate-y-6 group-hover:-rotate-2 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-0 left-0 h-84 w-84 scale-0 rounded-full bg-gray-400/20 transition-transform duration-300 ease-in will-change-transform group-hover:scale-100">
          <SvgLink component={<GithubSvg />} className="absolute left-36 bottom-4" url="https://github.com/Debonex" />
          <SvgLink
            component={<OsuSvg />}
            className="absolute left-16 bottom-11"
            url="https://osu.ppy.sh/users/14967305"
          />
          <SvgLink
            component={<TwitterSvg />}
            className="absolute left-56 bottom-11"
            url="https://twitter.com/debonexx"
          />
        </div>
      </div>
      <div className="mt-8 font-wotfard text-4xl font-bold">Debonex</div>
    </div>
  )
}

export default About
