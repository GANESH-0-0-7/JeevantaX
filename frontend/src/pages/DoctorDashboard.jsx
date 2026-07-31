import React, { useEffect, useState } from "react";
import { useAppointmentStore } from "../store/appointment.store";
import Spinner from '../components/Spinner';

const DoctorDashboard = () => {
  const {
    appointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    loading,
    err,
  } = useAppointmentStore();
  const [tab, setTab] = useState('current');

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
    } catch (error) {
    }
  };

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const accepted = appointments.filter(a => a.status === 'accepted').length;
  const completed = appointments.filter(a => a.status === 'completed').length;

  const currentAppointments = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-stretch bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6 justify-between min-h-[32rem]">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-100 mb-4 text-center">Doctor dashboard</h2>
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
          {loading && <Spinner className="my-8" />}
          {err && <p className="text-red-400 text-center font-semibold mt-2">{err}</p>}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {(tab === 'current' ? currentAppointments : pastAppointments).length === 0 ? (
                <p className="text-slate-400 text-center text-lg col-span-2">No {tab === 'current' ? 'current' : 'past'} appointments</p>
              ) : (
                (tab === 'current' ? currentAppointments : pastAppointments).map((appt) => (
                  <div key={appt._id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 shadow flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-100 mb-1">Patient: <span className="text-slate-300">{appt.patientId?.name}</span></h3>
                    <p className="text-slate-300"><span className="font-semibold text-slate-200">Email:</span> {appt.patientId?.email}</p>
                    <p className="text-slate-300"><span className="font-semibold text-slate-200">Time:</span> {appt.time}</p>
                    <p className="text-slate-300"><span className="font-semibold text-slate-200">Status:</span> <span className="font-bold">{appt.status}</span></p>
                    {appt.documentUrl && (
                      <div className="mt-2">
                        <span className="font-semibold text-slate-200">Attachment: </span>
                        {/(\.pdf($|\?))/i.test(appt.documentUrl) || appt.documentUrl.includes('/raw/upload/') ? (
                          <a
                            href={appt.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 underline"
                          >
                            View PDF
                          </a>
                        ) : (
                          <a
                            href={appt.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 underline"
                          >
                            View picture
                          </a>
                        )}
                      </div>
                    )}
                    {appt.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleStatusUpdate(appt._id, "accepted")}
                          className="flex-1 px-4 py-2 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold shadow transition-colors duration-200">
                          Accept
                        </button>
                        <button onClick={() => handleStatusUpdate(appt._id, "cancelled")}
                          className="flex-1 px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white font-semibold shadow transition-colors duration-200">
                          Reject
                        </button>
                      </div>
                    )}
                    {appt.status === "accepted" && (
                      <button onClick={() => handleStatusUpdate(appt._id, "completed")}
                        className="w-full px-4 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold shadow transition-colors duration-200 mt-2">
                        Mark as completed
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
