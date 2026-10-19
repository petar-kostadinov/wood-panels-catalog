import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import request from '../../utils/request.js'
import { readWishlist, saveWishlist } from '../../utils/wishlist.js'
import { useAuth } from '../../context/useAuth.js'
import Comments from '../comments/Comments.jsx'
import Spinner from '../spinner/Spinner.jsx'
import '../panelCard/PanelCard.css'
import '../home/Home.css'
import './Details.css'

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const email = user ? user.email : ''
  const [panel, setPanel] = useState(null)
  const [savedFor, setSavedFor] = useState(email)
  const [savedIds, setSavedIds] = useState(() => (email ? readWishlist(email) : []))
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')

  if (savedFor !== email) {
    setSavedFor(email)
    setSavedIds(email ? readWishlist(email) : [])
  }

  useEffect(() => {
    request(`/panels?id=eq.${id}`)
      .then((result) => setPanel(result[0]))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [id])

  function onWishlist() {
    const saved = savedIds.includes(panel.id)
    const next = saved
      ? savedIds.filter((item) => item !== panel.id)
      : [...savedIds, panel.id]

    saveWishlist(user.email, next)
    setSavedIds(next)
  }

  function onDelete() {
    const ok = window.confirm('Delete this sheet?')

    if (!ok) {
      return
    }

    setActionError('')
    setIsDeleting(true)

    request(`/panels?id=eq.${panel.id}`, 'DELETE', null, { token: user.accessToken })
      .then((result) => {
        if (Array.isArray(result) && result.length === 0) {
          throw new Error('The sheet was not deleted.')
        }

        navigate('/catalog')
      })
      .catch((err) => {
        setActionError(err.message)
        setIsDeleting(false)
      })
  }

  if (isLoading) {
    return (
      <section aria-label="Details">
        <Spinner />
      </section>
    )
  }

  if (error) {
    return (
      <section aria-label="Details">
        <p className="lede">{error}</p>
        <Link to="/catalog" className="back">Catalog</Link>
      </section>
    )
  }

  if (!panel) {
    return (
      <section aria-label="Details">
        <h2>Sheet not found</h2>
        <Link to="/catalog" className="back">Catalog</Link>
      </section>
    )
  }

  return (
    <section aria-label="Details">
      <Link to="/catalog" className="back">Catalog</Link>
      <img className="sheet-photo detail-photo" src={panel.image} alt={panel.name} />
      <div className="detail-head">
        <div>
          <span className="chip">{panel.material}</span>
          <h2>{panel.name}</h2>
        </div>
        <p className="price price-lg">€{Number(panel.price).toFixed(2)}</p>
      </div>
      <dl className="specs">
        <div>
          <dt>Thickness</dt>
          <dd>{panel.thickness} mm</dd>
        </div>
        <div>
          <dt>Width</dt>
          <dd>{panel.width} mm</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{panel.height} mm</dd>
        </div>
      </dl>
      <p className="copy">{panel.description}</p>
      <Comments panelId={panel.id} />
      {user && user.email === panel.author && (
        <div className="owner-actions">
          <Link to={`/panels/${panel.id}/edit`} className="wish-btn">Edit</Link>
          <button type="button" className="delete-btn" onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
      {actionError && <p className="lede">{actionError}</p>}
      {user && (
        <button type="button" className="wish-btn" onClick={onWishlist}>
          {savedIds.includes(panel.id) ? 'In wishlist' : 'Add to wishlist'}
        </button>
      )}
    </section>
  )
}
