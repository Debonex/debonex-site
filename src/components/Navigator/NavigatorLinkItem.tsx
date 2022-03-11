import clsx from "clsx"
import { FunctionComponent } from "react"
import { NavLink, To } from "react-router-dom"
import useRipple from "../../hooks/useRipple"

const NavigatorLinkItem: FunctionComponent<{ to: To }> = (props) => {
  const [addRipple, ripples] = useRipple()

  return (
    <NavLink
      className={({ isActive }) => clsx(isActive && "border-b-2 border-b-primary")}
      onMouseDown={addRipple}
      to={props.to}
    >
      <div className="relative overflow-hidden rounded-sm py-1 px-4">
        <span className="font-wotfard text-lg font-semibold transition-colors duration-150 hover:text-black-secondary dark:hover:text-white-secondary">
          {props.children}
        </span>
        {ripples}
      </div>
    </NavLink>
  )
}

export default NavigatorLinkItem
