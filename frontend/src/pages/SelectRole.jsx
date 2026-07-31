import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserMd, FaUserInjured } from 'react-icons/fa'

const SelectRole = () => {
    const navigate = useNavigate()
    const handleRole = (role) => {
        navigate(`/signup/${role}`)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 md:py-12 px-2 md:px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 mb-2 text-center">Choose your role</h1>
            <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-10 text-center">Are you a Doctor or a Patient? Select your role to continue.</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-3xl justify-center">
                <button
                    onClick={() => handleRole('doctor')}
                    className="flex-1 rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 border border-slate-800 bg-slate-900/70 hover:bg-slate-900/90 shadow-xl focus:outline-none"
                >
                    <FaUserMd className="text-indigo-400 text-6xl mb-4" />
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">I am a Doctor</h2>
                    <p className="text-slate-400 text-center">Sign up or log in to manage your appointments, view your schedule, and connect with patients.</p>
                </button>
                <button
                    onClick={() => handleRole('patient')}
                    className="flex-1 rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 border border-slate-800 bg-slate-900/70 hover:bg-slate-900/90 shadow-xl focus:outline-none"
                >
                    <FaUserInjured className="text-emerald-400 text-6xl mb-4" />
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">I am a Patient</h2>
                    <p className="text-slate-400 text-center">Book appointments, view your health records, and connect with top doctors easily and securely.</p>
                </button>
            </div>
        </div>
    )
}

export default SelectRole