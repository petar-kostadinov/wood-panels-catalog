import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" end>
          <span className="mark" aria-hidden="true" />
          Wood Panels
        </NavLink>
        <nav className="nav" aria-label="Main">
          <NavLink to="/catalog">Catalog</NavLink>
        </nav>
        <div className="session">
          <NavLink to="/login" className="quiet-btn">Sign in</NavLink>
          <NavLink to="/register" className="solid-btn">Register</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
