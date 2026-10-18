import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from '../../utils/request.js'
import { useAuth } from '../../context/useAuth.js'
import '../home/Home.css'
import '../register/Register.css'
import './Comments.css'

const requiredText = 'This field is required.'

export default function Comments({ panelId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    request(`/comments?panel_id=eq.${panelId}&order=created_at.asc`)
      .then(setComments)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [panelId])

  function onSubmit(event) {
    event.preventDefault()
    setError('')

    if (!message.trim()) {
      setFieldError(requiredText)
      return
    }

    setIsSending(true)

    request('/comments', 'POST', {
      panel_id: panelId,
      author: user.email,
      message: message.trim(),
    }, { token: user.accessToken })
      .then(() => request(`/comments?panel_id=eq.${panelId}&order=created_at.asc`))
      .then((result) => {
        setComments(result)
        setMessage('')
        setFieldError('')
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsSending(false))
  }

  function onDelete(comment) {
    const ok = window.confirm('Delete this comment?')

    if (!ok) {
      return
    }

    setDeleteError('')
    setDeletingId(comment.id)

    request(`/comments?id=eq.${comment.id}`, 'DELETE', null, { token: user.accessToken })
      .then((result) => {
        if (Array.isArray(result) && result.length === 0) {
          throw new Error('The comment was not deleted.')
        }

        setComments((current) => current.filter((item) => item.id !== comment.id))
      })
      .catch((err) => setDeleteError(err.message))
      .finally(() => setDeletingId(''))
  }

  return (
    <section className="comments" aria-label="Comments">
      <h3>Comments</h3>
      {isLoading && <p className="lede">Loading comments...</p>}
      {error && <p className="lede">{error}</p>}
      {!isLoading && !error && comments.length === 0 && (
        <p className="lede">No comments yet.</p>
      )}
      {!isLoading && !error && comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((comment) => {
            const added = new Date(comment.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            return (
              <li key={comment.id}>
                <p className="comment-message">{comment.message}</p>
                <p className="comment-by">{comment.author} · {added}</p>
                {user && user.email === comment.author && (
                  <button
                    type="button"
                    className="comment-delete"
                    onClick={() => onDelete(comment)}
                    disabled={deletingId === comment.id}
                  >
                    {deletingId === comment.id ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {deleteError && <p className="lede">{deleteError}</p>}
      {user ? (
        <form className="register-form comment-form" onSubmit={onSubmit} noValidate>
          <label>
            Comment
            <textarea
              value={message}
              onBlur={() => setFieldError(message.trim() ? '' : requiredText)}
              onChange={(event) => {
                const value = event.target.value
                setMessage(value)
                if (value.trim()) setFieldError('')
              }}
            />
            {fieldError && <span className="field-error">{fieldError}</span>}
          </label>
          <button className="submit-btn" type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      ) : (
        <p className="lede">
          <Link to="/login">Sign in</Link> to leave a comment.
        </p>
      )}
    </section>
  )
}
