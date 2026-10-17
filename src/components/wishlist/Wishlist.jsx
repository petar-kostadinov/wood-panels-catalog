import { useEffect, useState } from 'react'
import request from '../../utils/request.js'
import { readWishlist } from '../../utils/wishlist.js'
import { useAuth } from '../../context/useAuth.js'
import PanelCard from '../panelCard/PanelCard.jsx'
import '../home/Home.css'

export default function Wishlist() {
  const { user } = useAuth()
  const [panels, setPanels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const ids = readWishlist(user.email)

    if (ids.length === 0) {
      setIsLoading(false)
      return
    }

    request(`/panels?id=in.(${ids.join(',')})&order=created_at.desc`)
      .then(setPanels)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [user])

  return (
    <section aria-label="Wishlist">
      <div className="page-head">
        <h2>Wishlist</h2>
        <p className="lede">Add a sheet from its details page. It will be listed here.</p>
      </div>
      {isLoading && <p className="lede">Loading sheets...</p>}
      {error && <p className="lede">{error}</p>}
      {!isLoading && !error && panels.length === 0 && (
        <p className="lede">No saved sheets yet.</p>
      )}
      {!isLoading && !error && panels.length > 0 && (
        <div className="cards">
          {panels.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      )}
    </section>
  )
}
