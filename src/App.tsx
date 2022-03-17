import { createContext, FC, useMemo, useState } from "react"
import { Route, Routes } from "react-router-dom"

import Navigator from "./components/Navigator/Navigator"
import About from "./pages/About"
import Lab from "./pages/Lab"
import Photos from "./pages/Photos"
import Posts from "./pages/Posts"
import Post from "./pages/Post"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const defaultTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light"
document.body.classList.add(defaultTheme)

// default value?
export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {}
})

const App: FC = () => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const themeContextValue = useMemo<ThemeContextType>(
    () => ({
      theme: theme,
      toggleTheme: () => {
        const newTheme = theme === "light" ? "dark" : "light"
        document.body.classList.replace(theme, newTheme)
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
      }
    }),
    [theme]
  )

  return (
    <div className="h-full overflow-auto">
      <ThemeContext.Provider value={themeContextValue}>
        <Navigator />
      </ThemeContext.Provider>
      <Routes>
        <Route path="*" element={<Posts />} />
        <Route path="/post" element={<Post />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
