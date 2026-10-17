import { useEffect, useState } from 'react'
import request from '../../utils/request.js'
import PanelCard from '../panelCard/PanelCard.jsx'
import '../home/Home.css'
import './Catalog.css'

const materials = ['All', 'MDF', 'Plywood', 'Chipboard', 'Solid wood']

export default function Catalog() {
  const [panels, setPanels] = useState([])
  const [material, setMaterial] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const visible = material === 'All'
    ? panels
    : panels.filter((panel) => panel.material === material)

  useEffect(() => {
    request('/panels?order=created_at.desc')
      .then(setPanels)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section aria-label="Catalog">
      <div className="page-head">
        <h2>Sheet goods in stock</h2>
        <p className="lede">Chipboard, MDF, plywood, and solid wood. Size, thickness, and price are on every card.</p>
      </div>
      <div className="filters" role="group" aria-label="Material">
        {materials.map((item) => (
          <button
            key={item}
            type="button"
            className={item === material ? 'chip chip-on' : 'chip'}
            onClick={() => setMaterial(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {isLoading && <p className="lede">Loading sheets...</p>}
      {error && <p className="lede">{error}</p>}
      {!isLoading && !error && panels.length === 0 && (
        <p className="lede">No sheets yet.</p>
      )}
      {!isLoading && !error && panels.length > 0 && visible.length === 0 && (
        <p className="lede">No sheets of this material yet.</p>
      )}
      {!isLoading && !error && visible.length > 0 && (
        <div className="cards">
          {visible.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      )}
    </section>
  )
}
