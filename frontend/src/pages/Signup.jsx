import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import doctorImg from '../assets/doctor.jpg'
import patientImg from '../assets/patient.jpg'
import Spinner from '../components/Spinner';

const Signup = () => {
  const { role } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [workingHours, setWorkingHours] = useState([])
  const [showWorkingHours, setShowWorkingHours] = useState(false)
  const [err, setErr] = useState("")

  const { signup, loading } = useAuthStore()

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr("")

    const userData = role === "doctor"
      ? {
        name,
        email,
        password,
        role,
        specialization,
        workingHours,
      }
      : {
        name,
        email,
        password,
        role,
      }

    try {
      await signup(userData)
      navigate("/")
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed")
    }
  }

  const handleWorkingHourToggle = (hour) => {
    if (workingHours.includes(hour)) {
      setWorkingHours(workingHours.filter(h => h !== hour))
    } else {
      setWorkingHours([...workingHours, hour])
    }
  }

  const sideImg = role === 'doctor' ? doctorImg : patientImg;
  const cardWidthClass = role === 'doctor' ? 'max-w-4xl' : 'max-w-4xl'
  const cardMinHeightClass = role === 'doctor' ? 'min-h-[20rem]' : 'min-h-[36rem]'
  const formPaddingClass = role === 'doctor' ? 'p-5 md:p-8' : 'p-5 md:p-10'
  const formGapClass = role === 'doctor' ? 'gap-3' : 'gap-6'
  const fieldGapClass = role === 'doctor' ? 'gap-1' : 'gap-2'

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-4 md:py-8 px-2 md:px-4">
      <div className={`w-full ${cardWidthClass} ${cardMinHeightClass} bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden`}>
        <div className={`w-full md:w-1/2 flex flex-col justify-center ${formPaddingClass} order-2 md:order-1`}>
          <form onSubmit={handleSubmit} className={`flex flex-col ${formGapClass}`}>
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-slate-100">Create your account</h2>
              <p className="text-sm text-slate-400 mt-1">Sign up as {role && role.charAt(0).toUpperCase() + role.slice(1)}</p>
            </div>
            <div className={`flex flex-col ${fieldGapClass}`}>
              <label className="text-slate-300 text-sm" htmlFor="name">Name</label>
              <input
                id="name"
                placeholder='Your full name'
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 text-base"
              />
            </div>
            <div className={`flex flex-col ${fieldGapClass}`}>
              <label className="text-slate-300 text-sm" htmlFor="email">Email</label>
              <input
                id="email"
                placeholder='you@example.com'
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 text-base"
              />
            </div>
            <div className={`flex flex-col ${fieldGapClass}`}>
              <label className="text-slate-300 text-sm" htmlFor="password">Password</label>
              <input
                id="password"
                placeholder='••••••••'
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 text-base"
              />
            </div>
            {role === "doctor" && (
              <>
                <div className={`flex flex-col ${fieldGapClass}`}>
                  <label className="text-slate-300 text-sm" htmlFor="specialization">Specialization</label>
                  <select
                    id="specialization"
                    value={specialization}
                    required
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 text-base cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900">Select Specialization</option>
                    <option value="Cardiology" className="bg-slate-900">Cardiology</option>
                    <option value="Dermatology" className="bg-slate-900">Dermatology</option>
                    <option value="Pediatrics" className="bg-slate-900">Pediatrics</option>
                    <option value="Neurology" className="bg-slate-900">Neurology</option>
                    <option value="Orthopedics" className="bg-slate-900">Orthopedics</option>
                    <option value="Psychiatry" className="bg-slate-900">Psychiatry</option>
                    <option value="Radiology" className="bg-slate-900">Radiology</option>
                    <option value="Oncology" className="bg-slate-900">Oncology</option>
                    <option value="General Medicine" className="bg-slate-900">General Medicine</option>
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowWorkingHours(!showWorkingHours)}
                    className="w-full px-4 py-2 mt-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700/70 transition-colors duration-200 text-left"
                  >
                    {workingHours.length === 0 ? "Select Working Hours" : `Selected: ${workingHours.join(", ")}`}
                  </button>
                  {showWorkingHours && (
                    <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      {timeSlots.map((slot) => (
                        <label key={slot} className="flex items-center gap-2 cursor-pointer text-slate-200">
                          <input
                            type="checkbox"
                            id={slot}
                            checked={workingHours.includes(slot)}
                            onChange={() => handleWorkingHourToggle(slot)}
                            className="accent-indigo-500"
                          />
                          <span className="text-slate-200">{slot}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="w-full py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-base transition-colors duration-200 shadow-lg shadow-indigo-950/30">
              {loading ? <Spinner size={24} className="mx-auto" /> : "Create account"}
            </button>
            {err && <p className="text-red-400 text-center text-sm">{err}</p>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-slate-400">Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">Sign in</Link></p>
          </div>
        </div>
        <div className="relative hidden md:block md:w-1/2 bg-cover bg-center order-1 md:order-2" style={{ backgroundImage: `url(${sideImg})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80" />
        </div>
      </div>
    </div>
  )
}

export default Signup
