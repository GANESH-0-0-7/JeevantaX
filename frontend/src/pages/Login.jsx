import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import loginPhoto from '../assets/login.jpg'
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { login, loading } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr("")
    try {
      await login({ email, password })
      navigate("/")
    }
    catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-4xl min-h-[32rem] bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="relative hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${loginPhoto})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-100">Welcome back</h2>
              <p className="text-sm text-slate-400 mt-1">Sign in to continue to your account</p>
            </div>
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  placeholder='••••••••'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 my-auto h-8 px-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/60 text-sm"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type='submit' className="w-full py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-base transition-colors duration-200 shadow-lg shadow-indigo-950/30">
              {loading ? <Spinner size={24} className="mx-auto" /> : "Sign in"}
            </button>
            {err && <p className="text-red-400 text-center text-sm">{err}</p>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-slate-400">First time here? <Link to="/select" className="text-indigo-400 hover:text-indigo-300 font-semibold">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login