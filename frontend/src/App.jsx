import { useEffect, useState } from 'react'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SelectRole from './pages/SelectRole'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/auth.store.js'
import Home from './pages/Home'
import PublicHome from './pages/PublicHome'
import DoctorOnly from './components/DoctorOnly'
import PatientOnly from './components/PatientOnly'
import Navbar from './components/Navbar'
import BookAppointment from './pages/BookAppointment'
import TimeSlot from './pages/TimeSlot.jsx'
import ConfirmPage from './pages/ConfirmPage.jsx'
import RestrictedRoute from './components/RestrictedRoute.jsx'
import SymptomChecker from './pages/SymptomChecker.jsx'
import VaultPage from './pages/VaultPage.jsx'
import JeevantaX from './pages/JeevantaX.jsx'
import TherapistFinder from './pages/TherapistFinder.jsx'
import BackendConnectionLoader from './components/BackendConnectionLoader.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  const { checkAuth, loading, backendConnected, user } = useAuthStore()
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      if (backendConnected) {
        await checkAuth()
      }
      setInitialLoad(false)
    }
    initializeApp()
  }, [checkAuth, backendConnected])

  return (
    <BackendConnectionLoader>
      <Navbar />
      <Routes>
        <Route path="/select" element={<RestrictedRoute><SelectRole /></RestrictedRoute>} />
        <Route path="/signup/:role" element={<RestrictedRoute><Signup /></RestrictedRoute>} />
        <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />

        <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorOnly><DoctorDashboard /></DoctorOnly></ProtectedRoute>} />
        <Route path="/patient/dashboard" element={<ProtectedRoute><PatientOnly><PatientDashboard /></PatientOnly></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/time-slot" element={<ProtectedRoute><TimeSlot /></ProtectedRoute>} />
        <Route path="/confirm" element={<ProtectedRoute><ConfirmPage /></ProtectedRoute>} />
        <Route path="/symptom" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
        <Route path="/vault" element={<ProtectedRoute><VaultPage /></ProtectedRoute>} />
        <Route path="/JeevantaX" element={<ProtectedRoute><JeevantaX /></ProtectedRoute>} />
        <Route path="/therapist-finder" element={<ProtectedRoute><TherapistFinder /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        <Route path="/" element={
          backendConnected ? (
            user ? <ProtectedRoute><Home /></ProtectedRoute> : <PublicHome />
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading...</p>
              </div>
            </div>
          )
        } />
      </Routes>
    </BackendConnectionLoader>
  )
}

export default App