import React, { useEffect, useState } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'
import { useAuthStore } from '../store/auth.store.js'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const ConfirmPage = () => {
    const { selectedDoctor, selectedTime, confirmAppointment, loading, err } = useAppointmentStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const [fileUrl, setFileUrl] = useState("")
    const [fileType, setFileType] = useState("")
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState("")

    useEffect(() => {
        if (!user || !selectedDoctor || !selectedTime) {
            navigate('/book-appointment')
        }
    }, [user, selectedDoctor, selectedTime, navigate])

    const handleFileChange = async (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setUploadError("");
        setUploading(true);
        setFileType(selected.type);
        const isPdf = selected.type === 'application/pdf';
        const uploadUrl = isPdf
            ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`
            : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
        const formData = new FormData();
        formData.append('file', selected);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        try {
            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.secure_url) {
                setFileUrl(data.secure_url);
            } else {
                setUploadError('Upload failed.');
            }
        } catch {
            setUploadError('Upload failed.');
        } finally {
            setUploading(false);
        }
    }

    const handleConfirm = async () => {
        try {
            await confirmAppointment(fileUrl)
            navigate("/patient/dashboard")
        }
        catch (error) {
        }
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8 md:py-12 px-2 md:px-4">
            <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 text-center">Confirm your appointment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="rounded-xl p-5 border border-slate-800 bg-slate-900/70 shadow flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-slate-100">Your details</h3>
                        <p className="text-slate-300"><span className="font-semibold text-slate-200">Name:</span> {user?.name}</p>
                        <p className="text-slate-300"><span className="font-semibold text-slate-2 00">Email:</span> {user?.email}</p>
                    </div>
                    <div className="rounded-xl p-5 border border-slate-800 bg-slate-900/70 shadow flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-slate-100">Doctor details</h3>
                        <p className="text-slate-300"><span className="font-semibold text-slate-200">Name:</span> {selectedDoctor?.name}</p>
                        <p className="text-slate-300"><span className="font-semibold text-slate-200">Rating:</span> {selectedDoctor?.rating}</p>
                        <p className="text-slate-300"><span className="font-semibold text-slate-200">Specialization:</span> {selectedDoctor?.specialization}</p>
                    </div>
                </div>
                <div className="rounded-xl p-5 border border-slate-800 bg-slate-900/70 shadow flex flex-col gap-2 items-center">
                    <h3 className="text-lg font-bold text-slate-100">Appointment time</h3>
                    <p className="text-slate-300 text-lg">{selectedTime || ''}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <label className="font-semibold text-slate-200">Attach image/document (optional):</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                    />
                    {uploading && <Spinner size={24} className="my-2" />}
                    {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}
                    {fileUrl && (
                        <div className="mt-2">
                            {fileType === 'application/pdf' || fileUrl.includes('/raw/upload/') ? (
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">View PDF</a>
                            ) : (
                                <img src={fileUrl} alt="Uploaded" className="max-h-32 rounded shadow border border-slate-800" />
                            )}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={loading || uploading}
                    className="w-full py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                    {loading ? <Spinner size={24} className="mx-auto" /> : "Confirm appointment"}
                </button>
                {err && <p className="text-red-400 text-center font-semibold mt-1">{err}</p>}
            </div>
        </div>
    )
}

export default ConfirmPage