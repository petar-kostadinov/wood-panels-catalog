import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import request from '../../utils/request.js'
import '../panelCard/PanelCard.css'
import '../home/Home.css'
import './Details.css'

export default function Details() {
  const { id } = useParams()
  const [panel, setPanel] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    request(`/panels?id=eq.${id}`)
      .then((result) => setPanel(result[0]))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <section aria-label="Details">
        <p className="lede">Loading sheet...</p>
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
      <div className={`swatch detail-swatch swatch-${panel.material.toLowerCase().split(' ')[0]}`} />
      <div className="detail-head">
        <div>
          <span className="chip">{panel.material}</span>
          <h2>{panel.name}</h2>
          <p className="by">{panel.author}</p>
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
    </section>
  )
}
