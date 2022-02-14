import { FunctionComponent, useState } from "react"

const ThemeButton: FunctionComponent = () => {
  const theme = localStorage.getItem("theme")
  const [isDark, setIsDark] = useState<boolean>(theme === "dark")

  document.body.classList.add(theme === "dark" ? "dark" : "light")

  const handleChangeTheme = () => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark") {
      document.body.classList.replace("dark", "light")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.body.classList.replace("light", "dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <div onClick={handleChangeTheme} className="btn-theme">
      <svg
        className="svg-theme"
        height={24}
        width={24}
        viewBox="0 0 50 50"
        fill="currentColor"
        style={{
          transform: `rotate(${isDark ? -30 : 0}deg)`
        }}
      >
        <mask id="mask">
          <rect x={0} y={0} width={50} height={50} fill="#fff"></rect>
          <circle cx={40} cy={22} r={isDark ? 18 : 0} fill="#000" className="circle-transition"></circle>
        </mask>
        <circle cx={25} cy={25} r={isDark ? 16 : 12} mask="url(#mask)" className="circle-transition"></circle>

        <circle cx={25} cy={6} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={40} cy={12} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={45} cy={25} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={40} cy={38} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={25} cy={44} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={10} cy={38} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={5} cy={25} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
        <circle cx={10} cy={12} r={isDark ? 0 : 3} className="circle-sunshine"></circle>
      </svg>
    </div>
  )
}

export default ThemeButton
