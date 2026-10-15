import { Link, useParams } from 'react-router-dom'
import { getPanel, formatPrice } from '../../data/panels.js'
import '../panelCard/PanelCard.css'
import './Details.css'

function Details() {
  const { id } = useParams()
  const panel = getPanel(id)

  if (!panel) {
    return (
      <section aria-label="Details">
        <h2>Sheet not found</h2>
        <Link to="/catalog" className="back">
          Catalog
        </Link>
      </section>
    )
  }

  return (
    <section aria-label="Details">
      <Link to="/catalog" className="back">
        Catalog
      </Link>
      <div className={`swatch detail-swatch swatch-${panel.swatch}`} />
      <div className="detail-head">
        <div>
          <span className="chip">{panel.material}</span>
          <h2>{panel.name}</h2>
          <p className="by">{panel.author}</p>
        </div>
        <p className="price price-lg">{formatPrice(panel.price)}</p>
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
      <p className="copy">{panel.copy}</p>
    </section>
  )
}

export default Details
