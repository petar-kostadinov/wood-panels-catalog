import { Link } from 'react-router-dom'
import '../home/Home.css'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found" aria-label="404 not found">
      <div className="page-head">
        <h2>404 not found</h2>
        <span className="not-found-bar" aria-hidden="true" />
        <p className="lede">This address does not match a page.</p>
      </div>
      <p className="lede">
        <Link to="/catalog">Catalog</Link>
      </p>
    </section>
  )
}
