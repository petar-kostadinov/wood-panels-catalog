import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import RouteBanner from './components/routeBanner/RouteBanner.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import Catalog from './components/catalog/Catalog.jsx'
import Details from './components/details/Details.jsx'
import Register from './components/register/Register.jsx'
import './App.css'

function App() {
  return (
    <div className="shell">
      <Header />
      <RouteBanner />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Details />} />
          <Route path="/login" element={null} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
