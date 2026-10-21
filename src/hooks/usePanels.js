import { useEffect, useState } from 'react'
import request from '../utils/request.js'

export default function usePanels(path) {
  const [panels, setPanels] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(path))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!path) {
      return
    }

    request(path)
      .then(setPanels)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [path])

  return { panels, isLoading, error }
}
