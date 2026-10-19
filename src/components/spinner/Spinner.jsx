import { ClipLoader } from 'react-spinners'
import './Spinner.css'

export default function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading">
      <ClipLoader className="clip" />
    </div>
  )
}
