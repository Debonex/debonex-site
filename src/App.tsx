import { FunctionComponent } from "react"
import { Route, Routes } from "react-router-dom"

import Navigator from "./components/Navigator"
import About from "./pages/About"
import Lab from "./pages/Lab"
import Photos from "./pages/Photos"
import Posts from "./pages/Posts"
const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Navigator />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/photos" element={<Photos />}></Route>
        <Route path="/lab" element={<Lab />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  )
}

export default App
