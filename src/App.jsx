import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import RouteBanner from './components/RouteBanner.jsx'

function App() {
  return (
    <>
      <Header />
      <RouteBanner />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/catalog" element={null} />
        <Route path="/login" element={null} />
        <Route path="/register" element={null} />
      </Routes>
    </>
  )
}

export default App
