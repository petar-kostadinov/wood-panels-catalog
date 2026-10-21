import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import request from '../../utils/request.js'
import '../home/Home.css'
import '../register/Register.css'

const requiredText = 'This field is required.'
const materials = ['MDF', 'Plywood', 'Chipboard', 'Solid wood']

function wholeNumber(value) {
  if (!value.trim()) {
    return requiredText
  }

  const number = Number(value)

  if (!Number.isInteger(number) || number <= 0) {
    return 'Enter a whole number greater than 0.'
  }

  return ''
}

export default function NewListing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [material, setMaterial] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [thickness, setThickness] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    material: '',
    width: '',
    height: '',
    thickness: '',
    price: '',
    image: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      name: name.trim() ? '' : requiredText,
      material: material ? '' : requiredText,
      width: wholeNumber(width),
      height: wholeNumber(height),
      thickness: wholeNumber(thickness),
      price: '',
      image: '',
      description: description.trim() ? '' : requiredText,
    }

    if (!price.trim()) {
      nextErrors.price = requiredText
    } else if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      nextErrors.price = 'Enter a price greater than 0.'
    }

    if (!image.trim()) {
      nextErrors.image = requiredText
    } else if (!image.trim().startsWith('http://') && !image.trim().startsWith('https://')) {
      nextErrors.image = 'Enter an image URL.'
    }

    setFieldErrors(nextErrors)

    if (Object.values(nextErrors).some((item) => item)) {
      return
    }

    setIsLoading(true)

    request('/panels', 'POST', {
      name: name.trim(),
      material,
      width: Number(width),
      height: Number(height),
      thickness: Number(thickness),
      price: Number(price),
      author: user.email,
      description: description.trim(),
      image: image.trim(),
    }, { token: user.accessToken })
      .then(() => navigate('/catalog'))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <section aria-label="New listing">
      <div className="page-head">
        <h2>New listing</h2>
        <p className="lede">Publish a sheet with its size, material and price.</p>
      </div>
      <form className="register-form" onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input
            type="text"
            value={name}
            onBlur={() => markRequired('name', name)}
            onChange={(event) => {
              const value = event.target.value
              setName(value)
              if (value.trim()) markRequired('name', value)
            }}
          />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </label>
        <label>
          Material
          <select
            value={material}
            onBlur={() => markRequired('material', material)}
            onChange={(event) => {
              const value = event.target.value
              setMaterial(value)
              if (value.trim()) markRequired('material', value)
            }}
          >
            <option value="">Choose a material</option>
            {materials.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {fieldErrors.material && <span className="field-error">{fieldErrors.material}</span>}
        </label>
        <label>
          Width, mm
          <input
            type="text"
            value={width}
            onBlur={() => setFieldErrors((current) => ({ ...current, width: wholeNumber(width) }))}
            onChange={(event) => {
              const value = event.target.value
              setWidth(value)
              if (value.trim()) setFieldErrors((current) => ({ ...current, width: '' }))
            }}
          />
          {fieldErrors.width && <span className="field-error">{fieldErrors.width}</span>}
        </label>
        <label>
          Height, mm
          <input
            type="text"
            value={height}
            onBlur={() => setFieldErrors((current) => ({ ...current, height: wholeNumber(height) }))}
            onChange={(event) => {
              const value = event.target.value
              setHeight(value)
              if (value.trim()) setFieldErrors((current) => ({ ...current, height: '' }))
            }}
          />
          {fieldErrors.height && <span className="field-error">{fieldErrors.height}</span>}
        </label>
        <label>
          Thickness, mm
          <input
            type="text"
            value={thickness}
            onBlur={() => setFieldErrors((current) => ({ ...current, thickness: wholeNumber(thickness) }))}
            onChange={(event) => {
              const value = event.target.value
              setThickness(value)
              if (value.trim()) setFieldErrors((current) => ({ ...current, thickness: '' }))
            }}
          />
          {fieldErrors.thickness && <span className="field-error">{fieldErrors.thickness}</span>}
        </label>
        <label>
          Price, EUR
          <input
            type="text"
            value={price}
            onBlur={() => markRequired('price', price)}
            onChange={(event) => {
              const value = event.target.value
              setPrice(value)
              if (value.trim()) markRequired('price', value)
            }}
          />
          {fieldErrors.price && <span className="field-error">{fieldErrors.price}</span>}
        </label>
        <label>
          Image URL
          <input
            type="text"
            value={image}
            onBlur={() => markRequired('image', image)}
            onChange={(event) => {
              const value = event.target.value
              setImage(value)
              if (value.trim()) markRequired('image', value)
            }}
          />
          {fieldErrors.image && <span className="field-error">{fieldErrors.image}</span>}
        </label>
        <label>
          Description
          <textarea
            value={description}
            onBlur={() => markRequired('description', description)}
            onChange={(event) => {
              const value = event.target.value
              setDescription(value)
              if (value.trim()) markRequired('description', value)
            }}
          />
          {fieldErrors.description && <span className="field-error">{fieldErrors.description}</span>}
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </section>
  )
}
