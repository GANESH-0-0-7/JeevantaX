import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppointmentStore } from '../store/appointment.store.js'
import Spinner from '../components/Spinner';

const BookAppointment = () => {
    const { setSelectedDoctor, recommendedDoctor, fetchRecommendedDoctor, err, loading, fetchManualDoctors, manualDoctors, setRecommendedDoctors } = useAppointmentStore()
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            setRecommendedDoctors(null);
        };
    }, [setRecommendedDoctors]);

    const handleAIRecommendation = async () => {
        try {
            await fetchRecommendedDoctor(description)
        }
        catch (error) {
        }
    }

    const handleManualFetch = async () => {
        try {
            await fetchManualDoctors()
        }
        catch (error) {
        }
    }

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor)
        navigate("/time-slot")
    }

  return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8 md:py-12 px-2 md:px-4">
          <div className="w-full max-w-3xl bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 text-center">Book an appointment</h2>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
                  <textarea
                      className="w-full md:w-2/3 min-h-[100px] px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 text-base resize-none shadow"
                      placeholder='Enter your symptoms (e.g., chest pains and heart issue)'
                      onChange={(e) => setDescription(e.target.value)}
                  />
                  <button
                      onClick={handleAIRecommendation}
                      disabled={loading || !description}
                      className="mt-1 md:mt-0 px-6 md:px-8 py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto"
                  >
                      {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Submit"}
                  </button>
              </div>

              {recommendedDoctor && (
                  <div className="bg-slate-900/70 rounded-xl p-5 border border-slate-800 shadow flex flex-col md:flex-row items-center gap-6 mt-2">
                      <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-100 mb-2">Recommended doctor</h3>
                          <p className="text-slate-300"><span className="font-semibold text-slate-200">Name:</span> {recommendedDoctor.name}</p>
                          <p className="text-slate-300"><span className="font-semibold text-slate-200">Specialization:</span> {recommendedDoctor.specialization}</p>
                          <p className="text-slate-300"><span className="font-semibold text-slate-200">Rating:</span> {recommendedDoctor.rating}</p>
                      </div>
                      <button
                          onClick={() => handleDoctorSelect(recommendedDoctor)}
                          className="px-6 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold shadow transition-colors duration-200"
                      >
                          Select doctor
                      </button>
                  </div>
              )}

              <div className="flex items-center justify-center gap-2 text-slate-400 font-semibold my-1">
                  <span className="h-px w-8 bg-slate-700" />
                  OR
                  <span className="h-px w-8 bg-slate-700" />
              </div>

              <button
                  disabled={loading}
                  onClick={handleManualFetch}
                  className="px-6 md:px-8 py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mx-auto w-full md:w-auto"
              >
                  {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Choose manually"}
              </button>

              {manualDoctors.length > 0 && (
                  <div className="mt-4">
                      <h2 className="text-xl font-bold text-slate-100 mb-3">Available doctors</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          {manualDoctors.map((doc) => (
                              <div
                                  key={doc._id}
                                  onClick={() => handleDoctorSelect(doc)}
                                  className="cursor-pointer bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow transition-colors duration-200"
                              >
                                  <p className="text-lg font-semibold text-slate-100">{doc.name}</p>
                                  <p className="text-slate-300">Specialization: {doc.specialization}</p>
                                  <p className="text-slate-300">Rating: {doc.rating}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {err && <p className="text-red-400 text-center font-semibold mt-2">{err}</p>}
          </div>
      </div>
  )
}

export default BookAppointment