import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/useAuth.js'
import Header from './components/header/Header.jsx'
import RouteBanner from './components/routeBanner/RouteBanner.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import Catalog from './components/catalog/Catalog.jsx'
import Details from './components/details/Details.jsx'
import Register from './components/register/Register.jsx'
import Login from './components/login/Login.jsx'
import Wishlist from './components/wishlist/Wishlist.jsx'
import NewListing from './components/newListing/NewListing.jsx'
import NotFound from './components/notFound/NotFound.jsx'
import './App.css'

function Private({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default function App() {
  return (
    <div className="shell">
      <Header />
      <RouteBanner />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Private><Wishlist /></Private>} />
          <Route path="/panels/new" element={<Private><NewListing /></Private>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
