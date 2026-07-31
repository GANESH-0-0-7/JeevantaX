import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAppointmentStore } from '../store/appointment.store.js'

const TimeSlot = () => {
    const { selectedDoctor, setSelectedTime } = useAppointmentStore()
    const [selectedSlot, setSelectedSlot] = useState(null)
    const navigate = useNavigate()

    const handleNext = () => {
        if (!selectedSlot) return
        setSelectedTime(selectedSlot)
        navigate("/confirm")
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 md:py-12 px-2 md:px-4">
            <div className="w-full max-w-xl bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 text-center">Select a time slot</h2>
                <div className="rounded-xl p-4 md:p-5 border border-slate-800 bg-slate-900/70 shadow flex flex-col gap-2 mb-2">
                    <h4 className="text-lg font-bold text-slate-100">Doctor: <span className="text-slate-300">{selectedDoctor.name}</span></h4>
                    <p className="text-slate-300"><span className="font-semibold text-slate-200">Specialization:</span> {selectedDoctor.specialization}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                    {selectedDoctor.workingHours.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-5 py-2.5 rounded-lg border text-base font-semibold shadow focus:outline-none transition-colors ${selectedSlot === slot ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"}`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
                <button
                    disabled={!selectedSlot}
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TimeSlot