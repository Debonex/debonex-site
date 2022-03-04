import { FunctionComponent } from "react"
import { Link, To } from "react-router-dom"
import ThemeButton from "./ThemeButton"

const NavigatorLinkItem: FunctionComponent<{ to: To }> = (props) => {
  return (
    <Link className="font-large ml-5 font-wotfard text-lg font-semibold" to={props.to}>
      {props.children}
    </Link>
  )
}

const Navigator: FunctionComponent = () => {
  return (
    <div className="py-3">
      <div className="mx-auto flex max-w-5xl">
        <Link className="mx-3 flex font-kitty text-2xl font-medium" to="/">
          <div className="text-primary">Debone</div>
          <div className="text-deputy">x</div>
        </Link>
        <div className="flex items-center py-2">
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
