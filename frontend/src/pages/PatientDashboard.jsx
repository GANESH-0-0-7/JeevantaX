import React, { useEffect, useState } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'
import Spinner from '../components/Spinner'
import { FaCheckCircle, FaHourglassHalf, FaClipboardCheck } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PatientDashboard = () => {
  const { appointments, loading, err, fetchAppointments } = useAppointmentStore()
  const [tab, setTab] = useState('current')
  const [ratingState, setRatingState] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const accepted = appointments.filter(a => a.status === 'accepted').length;
  const completed = appointments.filter(a => a.status === 'completed').length;

  const getCardStyle = (status) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-slate-800/70 border-slate-700',
          badge: 'bg-amber-500/90 text-amber-100',
          icon: <FaHourglassHalf className="text-amber-400 text-2xl mr-2" />
        };
      case 'accepted':
        return {
          bg: 'bg-slate-800/70 border-slate-700',
          badge: 'bg-indigo-500/90 text-indigo-100',
          icon: <FaClipboardCheck className="text-indigo-400 text-2xl mr-2" />
        };
      case 'completed':
        return {
          bg: 'bg-slate-800/70 border-slate-700',
          badge: 'bg-emerald-500/90 text-emerald-100',
          icon: <FaCheckCircle className="text-emerald-400 text-2xl mr-2" />
        };
      default:
        return {
          bg: 'bg-slate-800/70 border-slate-700',
          badge: 'bg-slate-500 text-slate-100',
          icon: null
        };
    }
  };

  const currentAppointments = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  const handleRate = async (appointmentId, rating) => {
  setSubmitting(true);

  try {
    const res = await fetch(`${API}/api/appointment/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        appointmentId,
        rating,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setRatingState((prev) => ({
        ...prev,
        [appointmentId]: rating,
      }));

      fetchAppointments();
    } else {
      alert(data.message || "Failed to rate");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to rate");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-stretch bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6 justify-between min-h-[32rem]">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-100 mb-4 text-center">Patient dashboard</h2>
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-100">{total}</span>
                <span className="text-slate-300 font-semibold">Total appointments</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-100">{pending}</span>
                <span className="text-slate-300 font-semibold">Pending</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-100">{accepted}</span>
                <span className="text-slate-300 font-semibold">Accepted</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-100">{completed}</span>
                <span className="text-slate-300 font-semibold">Completed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-4 md:gap-8">
          <div className="flex gap-2 md:gap-4 mb-4 flex-wrap">
            <button
              className={`px-6 py-2 rounded-t-lg font-bold text-lg focus:outline-none ${tab === 'current' ? 'bg-indigo-500/90 text-white shadow' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
              onClick={() => setTab('current')}
            >
              Current appointments
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-bold text-lg focus:outline-none ${tab === 'past' ? 'bg-emerald-500/90 text-white shadow' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
              onClick={() => setTab('past')}
            >
              Past appointments
            </button>
          </div>
          {err && <p className="text-red-400 text-center font-semibold mt-2">{err}</p>}
          {loading && <Spinner className="my-8" />}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {(tab === 'current' ? currentAppointments : pastAppointments).length === 0 ? (
                <p className="text-slate-400 text-center text-lg col-span-2">No {tab === 'current' ? 'current' : 'past'} appointments</p>
              ) : (
                (tab === 'current' ? currentAppointments : pastAppointments).map((appointment) => {
                  const { bg, badge, icon } = getCardStyle(appointment.status);
                  return (
                    <div key={appointment._id} className={`${bg} border rounded-xl p-6 shadow flex flex-col gap-2 relative overflow-hidden`}>
                      <div className="flex items-center mb-2">
                        {icon}
                        <h3 className="text-xl font-bold mr-2">Doctor: <span className="text-slate-200">{appointment.doctorId.name}</span></h3>
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badge}`}>{appointment.status}</span>
                      </div>
                      <p className="text-slate-300"><span className="font-semibold text-slate-200">Specialization:</span> {appointment.doctorId.specialization}</p>
                      <p className="text-slate-300"><span className="font-semibold text-slate-200">Time:</span> {appointment.time}</p>
                      <p className="text-slate-300"><span className="font-semibold text-slate-200">Booked At:</span> {new Date(appointment.createdAt).toLocaleString()}</p>
                      {tab === 'past' && (
                        <div className="mt-2">
                          {appointment.rating ? (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-emerald-400">Rated:</span>
                              {[...Array(appointment.rating)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400" />
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <span className="font-semibold text-indigo-400">Rate your doctor:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`cursor-pointer ${ratingState[appointment._id] >= star ? 'text-yellow-400' : 'text-slate-500'}`}
                                    onClick={() => setRatingState((prev) => ({ ...prev, [appointment._id]: star }))}
                                  />
                                ))}
                              </div>
                              <button
                                className="mt-1 px-4 py-1 rounded bg-indigo-500/90 text-white font-semibold disabled:opacity-60"
                                disabled={!ratingState[appointment._id] || submitting}
                                onClick={() => handleRate(appointment._id, ratingState[appointment._id])}
                              >
                                {submitting ? 'Submitting...' : 'Submit rating'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard