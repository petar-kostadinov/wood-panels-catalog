import { Link } from 'react-router-dom'
import './PanelCard.css'

export default function PanelCard({ panel }) {
  const added = new Date(panel.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link to={`/catalog/${panel.id}`} className="card">
      <img className="sheet-photo" src={panel.image} alt="" />
      <span className="card-top">
        <span className="chip">{panel.material}</span>
        <span className="price">€{Number(panel.price).toFixed(2)}</span>
      </span>
      <span className="card-name">{panel.name}</span>
      <span className="meta">
        {panel.width} × {panel.height} mm · {panel.thickness} mm
      </span>
      <span className="by">Added {added}</span>
    </Link>
  )
}
