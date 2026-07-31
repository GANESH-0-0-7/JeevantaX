import React, { useEffect, useState } from 'react'
import { useAiStore } from '../store/ai.store.js'

const SymptomChecker = () => {
  const [prompt, setPrompt] = useState("")
  const { fetchSymptom, loading, response, err, clearResponse } = useAiStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchSymptom(prompt)
    setPrompt("")
  }

  useEffect(() => {
    return () => {
      clearResponse()
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 px-2 md:px-6 overflow-y-visible">
      <div className="w-full max-w-4xl flex flex-col gap-6 md:gap-8">
        <div className="w-full flex flex-col gap-6 md:gap-8 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-10 lg:p-14">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-500/20 p-4 rounded-full border border-indigo-500/30">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-3 tracking-tight">CareMate</h1>
            <p className="text-slate-300 text-lg mb-6">AI-powered healthcare guidance for symptom analysis and health insights</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Describe your symptoms or health concerns..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="px-6 py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 text-lg shadow-sm"
              disabled={loading}
            />
            <button
              disabled={loading || !prompt}
              type="submit"
              className="px-8 py-4 rounded-xl bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-lg transition-colors duration-200 disabled:opacity-60 shadow-lg"
            >
              {loading ? "Analyzing..." : "Get Health Insights"}
            </button>
          </form>

          {err && <p className="text-red-400 text-center font-semibold">{err}</p>}

          {response && (
            <div className="mt-4 bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-slate-200 font-semibold text-lg">Health Analysis</h3>
              </div>
              <p className="text-slate-200 whitespace-pre-line text-base leading-relaxed">
                {response.replace(/\*\*/g, "")}
              </p>
            </div>
          )}

          <div className="mt-6 bg-slate-800/50 border-l-4 border-amber-500 rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="w-6 h-6 mt-1 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M2.25 19.5l9.02-15.02a1.5 1.5 0 012.46 0l9.02 15.02A1.5 1.5 0 0121.02 21H2.98a1.5 1.5 0 01-1.29-2.25z" />
              </svg>
              <div>
                <h4 className="text-amber-200 font-semibold mb-2">Important Disclaimer</h4>
                <p className="text-amber-100 text-sm leading-relaxed">
                  This AI analysis is for informational purposes only and should not replace professional medical advice.
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker