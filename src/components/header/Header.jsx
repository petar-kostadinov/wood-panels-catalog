import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, clearUser } = useAuth()
  const onCatalog = pathname.startsWith('/catalog')

  function onSignOut() {
    clearUser()
    navigate('/')
  }

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
          {user && (
            <Link to="/wishlist" className={pathname === '/wishlist' ? 'active' : undefined} aria-current={pathname === '/wishlist' ? 'page' : undefined}>
              Wishlist
            </Link>
          )}
          {user && (
            <Link to="/panels/new" className={pathname === '/panels/new' ? 'active' : undefined} aria-current={pathname === '/panels/new' ? 'page' : undefined}>
              New listing
            </Link>
          )}
        </nav>
        {user ? (
          <div className="session">
            <span className="who">{user.email}</span>
            <button type="button" className="quiet-btn" onClick={onSignOut}>Sign out</button>
          </div>
        ) : (
          <div className="session">
            <Link to="/login" className="quiet-btn">Sign in</Link>
            <Link to="/register" className="solid-btn">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}
