import { FC, useContext } from "react"
import { ThemeContext } from "../../App"
import { v4 } from "../../modules/utilities/uuid"

const Sunshine: FC<{ cx: number; cy: number; r: number }> = (props) => {
  return <circle cx={props.cx} cy={props.cy} r={props.r} className="transition-all duration-600 ease-out"></circle>
}

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isDark = theme === "dark"

  const sunshineRadius = isDark ? 0 : 3
  const sunshineXy = [
    [25, 6],
    [40, 12],
    [45, 25],
    [40, 38],
    [25, 44],
    [10, 38],
    [5, 25],
    [10, 12]
  ]
  const maskId = v4()

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer text-black-secondary transition-colors duration-300 ease-out hover:text-black dark:text-white-secondary dark:hover:text-white"
    >
      <svg
        className="transition-transform duration-600 ease-out"
        height={24}
        width={24}
        viewBox="0 0 50 50"
        fill="currentColor"
        style={{ transform: `rotate(${isDark ? -30 : 0}deg)` }}
      >
        <mask id={maskId} className="theme-mask">
          <rect x={0} y={0} width={50} height={50} fill="#fff"></rect>
          <circle cx={40} cy={22} r={isDark ? 18 : 0} fill="#000" className="transition-all duration-100 ease-out" />
        </mask>
        <circle
          cx={25}
          cy={25}
          r={isDark ? 16 : 12}
          mask={`url(#${maskId})`}
          className="transition-all duration-100 ease-out"
        />

        {sunshineXy.map((position, idx) => (
          <Sunshine cx={position[0]} cy={position[1]} r={sunshineRadius} key={idx} />
        ))}
      </svg>
    </div>
  )
}

export default ThemeButton
