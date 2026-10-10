import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function ProtectedRoute({ children }) {
  const { user } = useAppContext()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}

export default ProtectedRoute
