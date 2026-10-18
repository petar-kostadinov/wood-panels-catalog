import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import { loginAccount } from '../../utils/request.js'
import '../home/Home.css'
import '../register/Register.css'

const requiredText = 'This field is required.'

export default function Login() {
  const { user, saveUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state && location.state.message
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (user) {
    return <Navigate to="/" />
  }

  const markRequired = (field, value) => {
    setFieldErrors((current) => ({
      ...current,
      [field]: value.trim() ? '' : requiredText,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setError('')

    const nextErrors = { email: '', password: '' }

    if (!email.trim()) {
      nextErrors.email = requiredText
    } else if (!email.includes('@')) {
      nextErrors.email = 'Enter a valid email.'
    }

    if (!password) {
      nextErrors.password = requiredText
    }

    setFieldErrors(nextErrors)

    if (nextErrors.email || nextErrors.password) {
      return
    }

    setIsLoading(true)

    loginAccount(email, password)
      .then((result) => {
        saveUser({
          email: result.user.email,
          accessToken: result.access_token,
        })
        navigate('/')
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <section aria-label="Sign in">
      <div className="page-head">
        <h2>Sign in</h2>
        <p className="lede">Use the email and password from your account.</p>
      </div>
      {message && <p className="form-message">{message}</p>}
      <form className="register-form" onSubmit={onSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            value={email}
            onBlur={() => markRequired('email', email)}
            onChange={(event) => {
              const value = event.target.value
              setEmail(value)
              if (value.trim()) markRequired('email', value)
            }}
          />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onBlur={() => markRequired('password', password)}
            onChange={(event) => {
              const value = event.target.value
              setPassword(value)
              if (value.trim()) markRequired('password', value)
            }}
          />
          {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        <p className="lede">
          No account yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  )
}
