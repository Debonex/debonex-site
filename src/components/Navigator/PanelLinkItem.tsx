import clsx from "clsx"
import { FC } from "react"
import { NavLink, To } from "react-router-dom"

const PanelLinkItem: FC<{ to: To }> = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          isActive && "border-b-2 border-b-primary",
          "py-2 text-2xl font-bold transition-colors hover:bg-light-outstand/40 dark:hover:bg-dark-outstand/40"
        )
      }
      to={props.to}
    >
      <div className="pl-2">{props.children}</div>
    </NavLink>
  )
}

export default PanelLinkItem
