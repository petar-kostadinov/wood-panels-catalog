import PanelCard from '../panelCard/PanelCard.jsx'
import { panels } from '../../data/panels.js'
import './Home.css'

function Home() {
  return (
    <section aria-label="Home">
      <div className="page-head">
        <h2>Latest listings</h2>
        <p className="lede">The sheets added most recently. Open a card to see the details.</p>
      </div>
      <div className="cards">
        {panels.map((panel) => (
          <PanelCard key={panel.id} panel={panel} />
        ))}
      </div>
    </section>
  )
}

export default Home
