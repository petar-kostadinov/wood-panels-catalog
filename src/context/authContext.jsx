import { useState } from 'react'
import { AuthContext } from './useAuth.js'

function readUser() {
  const saved = localStorage.getItem('user')
  return saved ? JSON.parse(saved) : null
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)

  function saveUser(nextUser) {
    localStorage.setItem('user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function clearUser() {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  )
}
