import { Link } from 'react-router-dom'
import usePanels from '../../hooks/usePanels.js'
import { useAuth } from '../../hooks/useAuth.js'
import PanelCard from '../panelCard/PanelCard.jsx'
import Spinner from '../spinner/Spinner.jsx'
import './Home.css'

export default function Home() {
  const { user } = useAuth()
  const { panels, isLoading, error } = usePanels('/panels?order=created_at.desc&limit=3')

  return (
    <section aria-label="Home">
      <div className="page-head">
        <h2>Latest listings</h2>
        <p className="lede">The sheets added most recently. Open a card to see the details.</p>
        {!user && (
          <p className="lede">
            <Link to="/login">Sign in</Link> to publish a sheet.
          </p>
        )}
      </div>
      {isLoading && <Spinner />}
      {error && <p className="lede">{error}</p>}
      {!isLoading && !error && panels.length === 0 && (
        <p className="lede">No sheets yet.</p>
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
