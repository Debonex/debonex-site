import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import ThemeButton from "./ThemeButton"

const Navigator: FunctionComponent = () => {
  return (
    <div className="navigator-container">
      <div className="navigator-container__inner">
        <Link className="navigator-logo" to="/">
          <div className="navigator-logo__prev">Debone</div>
          <div className="navigator-logo__after">x</div>
        </Link>
        <div className="navigator-list">
          <Link className="navigator-list__item" to="/">
            Posts
          </Link>
          <Link className="navigator-list__item" to="/photos">
            Photos
          </Link>
          <Link className="navigator-list__item" to="/lab">
            Lab
          </Link>
          <Link className="navigator-list__item" to="/about">
            About
          </Link>
        </div>
        <div className="navigator-menu">
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}

export default Navigator
