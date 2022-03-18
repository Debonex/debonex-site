import React, { FC } from "react"
import { ReactComponent as GithubSvg } from "@/assets/svg/github.svg"

const SvgLink: FC<{ component: React.ReactNode }> = (props) => {
  return (
    <div className="absolute left-36 bottom-4 h-12 w-12 scale-0 fill-primary opacity-0 transition-all duration-300 ease-in group-hover:scale-100 group-hover:opacity-100">
      {props.component}
    </div>
  )
}

const About: FC = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center pt-40">
      <div className="group relative rounded-full bg-light-outstand p-20 transition-colors dark:bg-dark-outstand">
        <div className="relative h-44 w-44 rounded-full bg-gray-400 transition-transform duration-300 clip-profile group-hover:scale-105">
          <img
            src="/images/profile.svg"
            className="absolute -top-8 transition-transform duration-300 group-hover:-translate-y-6 group-hover:-rotate-2 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-0 left-0 h-84 w-84 scale-0 rounded-full bg-gray-400/20 transition-transform duration-300 ease-in group-hover:scale-100">
          <SvgLink component={<GithubSvg />} />
        </div>
      </div>
    </div>
  )
}

export default About
