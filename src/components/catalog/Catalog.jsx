import { useState } from 'react'
import PanelCard from '../panelCard/PanelCard.jsx'
import { panels } from '../../data/panels.js'
import '../home/Home.css'
import './Catalog.css'

const materials = ['All', 'MDF', 'Plywood', 'Chipboard', 'Solid wood']

function Catalog() {
  const [material, setMaterial] = useState('All')
  const visible = material === 'All' ? panels : panels.filter((panel) => panel.material === material)

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
      <div className="cards">
        {visible.map((panel) => (
          <PanelCard key={panel.id} panel={panel} />
        ))}
      </div>
      {visible.length === 0 && <p className="lede">No sheets of this material yet.</p>}
    </section>
  )
}

export default Catalog
