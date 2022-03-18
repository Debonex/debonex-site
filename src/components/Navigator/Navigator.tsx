import { FC, useState } from "react"
import { Link } from "react-router-dom"
import NavigatorLinkItem from "./NavigatorLinkItem"
import PanelButton from "./PanelButton"
import PanelLinkItem from "./PanelLinkItem"
import ThemeButton from "./ThemeButton"

const Navigator: FC = () => {
  const [active, setActive] = useState<boolean>(false)

  return (
    <div className="sticky top-0 z-10">
      {/* navigator bar */}
      <div className="bg-light py-3 transition-colors duration-300 dark:bg-dark ">
        <div className="mx-auto flex max-w-5xl">
          <Link className="mx-3 flex font-kitty text-2xl font-medium" to="/">
            <div className="text-primary">Debone</div>
            <div className="text-deputy">x</div>
          </Link>
          <div className="hidden items-center md:flex">
            <NavigatorLinkItem to="/">Posts</NavigatorLinkItem>
            <NavigatorLinkItem to="/photos">Photos</NavigatorLinkItem>
            <NavigatorLinkItem to="/lab">Lab</NavigatorLinkItem>
            <NavigatorLinkItem to="/about">About</NavigatorLinkItem>
          </div>
          <div className="ml-auto p-2">
            <div className="hidden md:block">
              <ThemeButton />
            </div>
            <div className="md:hidden">
              <PanelButton onClick={() => setActive(!active)} active={active} />
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigator panel */}
      {active && (
        <div
          className="absolute w-full cursor-pointer bg-light/60 px-4 backdrop-blur-sm transition-colors duration-300 dark:bg-dark/60"
          style={{
            height: "calc(100vh - 100%)"
          }}
          onClick={() => setActive(false)}
        >
          <div className="my-2 flex justify-end">
            <ThemeButton />
          </div>
          <div className="flex flex-col">
            <PanelLinkItem to="/">Posts</PanelLinkItem>
            <PanelLinkItem to="/photos">Photos</PanelLinkItem>
            <PanelLinkItem to="/lab">Lab</PanelLinkItem>
            <PanelLinkItem to="/about">About</PanelLinkItem>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigator
