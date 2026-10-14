import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import RouteBanner from './components/RouteBanner.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <div className="shell">
      <Header />
      <RouteBanner />
      <main className="site-main">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/catalog" element={null} />
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
