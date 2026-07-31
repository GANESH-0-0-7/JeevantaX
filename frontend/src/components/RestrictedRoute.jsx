import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'
import Spinner from './Spinner'

const RestrictedRoute = ({ children }) => {
  const { user, loading, checkAuth } = useAuthStore()

  useEffect(() => {
    if (user === null) {
      checkAuth();
    }
  }, [user, checkAuth]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Spinner size={64} />
    </div>
  )
  if (user) return <Navigate to="/" />
  return children
}

export default RestrictedRoute