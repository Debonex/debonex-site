import { FunctionComponent } from "react"
import { Link, NavLink, To } from "react-router-dom"
import useRipple from "../hooks/useRipple"
import ThemeButton from "./ThemeButton"

const NavigatorLinkItem: FunctionComponent<{ to: To }> = (props) => {
  const [addRipple, ripples] = useRipple()

  return (
    <NavLink
      className={({ isActive }) => (isActive ? "border-b-2 border-b-primary" : "")}
      onMouseDown={addRipple}
      to={props.to}
    >
      <div className="relative overflow-hidden rounded-sm py-1 px-4">
        <span className="font-large font-wotfard text-lg font-semibold transition-colors duration-150 hover:text-black-secondary dark:hover:text-white-secondary">
          {props.children}
        </span>
        {ripples}
      </div>
    </NavLink>
  )
}

const Navigator: FunctionComponent = () => {
  return (
    <div className="sticky top-0 z-10 bg-light py-3 transition-colors duration-300 dark:bg-dark">
      <div className="mx-auto flex max-w-5xl">
        <Link className="mx-3 flex font-kitty text-2xl font-medium" to="/">
          <div className="text-primary">Debone</div>
          <div className="text-deputy">x</div>
        </Link>
        <div className="flex items-center">
          <NavigatorLinkItem to="/">Posts</NavigatorLinkItem>
          <NavigatorLinkItem to="/photos">Photos</NavigatorLinkItem>
          <NavigatorLinkItem to="/lab">Lab</NavigatorLinkItem>
          <NavigatorLinkItem to="/about">About</NavigatorLinkItem>
        </div>
        <div className="ml-auto py-2">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}

export default Navigator
