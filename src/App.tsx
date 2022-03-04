import { FunctionComponent } from "react"
import { Route, Routes } from "react-router-dom"

import Navigator from "./components/Navigator"
import About from "./pages/About"
import Lab from "./pages/Lab"
import Photos from "./pages/Photos"
import Posts from "./pages/Posts"
import Post from "./pages/Post"
const App: FunctionComponent = () => {
  return (
    <div className="h-full overflow-auto">
      <Navigator />
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
