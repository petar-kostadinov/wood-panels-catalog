import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/panels.js'
import './PanelCard.css'

function PanelCard({ panel }) {
  return (
    <Link to={`/catalog/${panel.id}`} className="card">
      <span className={`swatch swatch-${panel.swatch}`} />
      <span className="card-top">
        <span className="chip">{panel.material}</span>
        <span className="price">{formatPrice(panel.price)}</span>
      </span>
      <span className="card-name">{panel.name}</span>
      <span className="meta">
        {panel.width} × {panel.height} mm · {panel.thickness} mm
      </span>
      <span className="by">
        {panel.author} · Added {panel.added}
      </span>
    </Link>
  )
}

export default PanelCard
