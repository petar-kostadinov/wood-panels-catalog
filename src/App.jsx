import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import RouteBanner from './components/routeBanner/RouteBanner.jsx'
import Footer from './components/footer/Footer.jsx'
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
