import usePanels from '../../hooks/usePanels.js'
import { readWishlist } from '../../utils/wishlist.js'
import { useAuth } from '../../hooks/useAuth.js'
import PanelCard from '../panelCard/PanelCard.jsx'
import Spinner from '../spinner/Spinner.jsx'
import '../home/Home.css'

export default function Wishlist() {
  const { user } = useAuth()
  const ids = readWishlist(user.email)
  const path = ids.length
    ? `/panels?id=in.(${ids.join(',')})&order=created_at.desc`
    : ''
  const { panels, isLoading, error } = usePanels(path)

  return (
    <section aria-label="Wishlist">
      <div className="page-head">
        <h2>Wishlist</h2>
        <p className="lede">Add a sheet from its details page. It will be listed here.</p>
      </div>
      {isLoading && <Spinner />}
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
