import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Header />
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
