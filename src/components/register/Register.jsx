import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import { registerAccount } from '../../utils/request.js'
import '../home/Home.css'
import './Register.css'

const requiredText = 'This field is required.'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, saveUser } = useAuth()

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

    const nextErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!email.trim()) {
      nextErrors.email = requiredText
    } else if (!email.includes('@')) {
      nextErrors.email = 'Enter a valid email.'
    }

    if (!password) {
      nextErrors.password = requiredText
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = requiredText
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setFieldErrors(nextErrors)

    if (nextErrors.email || nextErrors.password || nextErrors.confirmPassword) {
      return
    }

    setIsLoading(true)

    registerAccount(email, password)
      .then((result) => {
        if (result.session) {
          saveUser({
            email: result.user.email,
            accessToken: result.session.access_token,
          })
        }
        navigate('/')
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <section aria-label="Register">
      <div className="page-head">
        <h2>Register</h2>
        <p className="lede">Create an account to save sheets and publish listings.</p>
      </div>
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
        <label>
          Repeat password
          <input
            type="password"
            value={confirmPassword}
            onBlur={() => markRequired('confirmPassword', confirmPassword)}
            onChange={(event) => {
              const value = event.target.value
              setConfirmPassword(value)
              if (value.trim()) markRequired('confirmPassword', value)
            }}
          />
          {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Register'}
        </button>
        <p className="lede">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  )
}
