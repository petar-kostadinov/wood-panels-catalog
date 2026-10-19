import { useEffect, useState } from 'react'
import request from '../../utils/request.js'
import PanelCard from '../panelCard/PanelCard.jsx'
import Spinner from '../spinner/Spinner.jsx'
import './Home.css'

export default function Home() {
  const [panels, setPanels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    request('/panels?order=created_at.desc')
      .then(setPanels)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section aria-label="Home">
      <div className="page-head">
        <h2>Latest listings</h2>
        <p className="lede">The sheets added most recently. Open a card to see the details.</p>
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
