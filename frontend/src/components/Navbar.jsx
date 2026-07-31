import React, { useState, useRef, useEffect } from 'react'
import image from "../assets/logo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import Spinner from './Spinner';

const Navbar = () => {
    const { loading, logout, user } = useAuthStore()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        }
        catch (error) {
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    return (
        <>
            <nav className="flex bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-800 h-20 px-6 md:px-8 justify-between items-center sticky top-0 z-50">
                <Link to="/">
                    <img className="h-12 w-12 rounded-full object-contain border border-slate-700 shadow" src={image} alt="Logo" />
                </Link>

                <div className="text-lg md:text-xl font-medium flex items-center gap-3 md:gap-4 ">
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((open) => !open)}
                                className="px-4 md:px-6 py-2 rounded-full bg-indigo-500/90 hover:bg-indigo-500 transition-colors duration-200 text-white font-semibold shadow text-base md:text-lg focus:outline-none"
                            >
                                Features
                                <span className="ml-2">▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/book"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Book Appointment
                                        </Link>
                                    )}
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/patient/dashboard"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Patient Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'doctor' && (
                                        <Link
                                            to="/doctor/dashboard"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Doctor Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/symptom"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            CareMate
                                        </Link>
                                    )}
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/JeevantaX"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            JeevantaX
                                        </Link>
                                    )}
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/therapist-finder"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Therapist Finder
                                        </Link>
                                    )}
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/vault"
                                            className="block px-6 py-3 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors duration-150 text-base"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            JeevantaVault
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {user ?
                        (
                            <button
                                onClick={handleLogout}
                                className="px-4 md:px-6 py-2 cursor-pointer rounded-full bg-emerald-500/90 hover:bg-emerald-500 transition-colors duration-200 text-white font-semibold shadow"
                            >
                                {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Log Out"}
                            </button>
                        )
                        :
                        (
                            <Link to="/login">
                                <button
                                    className="cursor-pointer px-4 md:px-6 py-2 rounded-full bg-indigo-500/90 hover:bg-indigo-500 transition-colors duration-200 text-white font-semibold shadow"
                                >
                                    Login
                                </button>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar