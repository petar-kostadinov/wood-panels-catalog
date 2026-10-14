import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const { pathname } = useLocation()
  const onCatalog = pathname.startsWith('/catalog')

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="mark" aria-hidden="true" />
          Wood Panels
        </Link>
        <nav className="nav" aria-label="Main">
          <Link to="/catalog" className={onCatalog ? 'active' : undefined} aria-current={onCatalog ? 'page' : undefined}>
            Catalog
          </Link>
        </nav>
        <div className="session">
          <Link to="/login" className="quiet-btn">Sign in</Link>
          <Link to="/register" className="solid-btn">Register</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
