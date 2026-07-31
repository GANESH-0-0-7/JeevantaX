const BackendWakeupLoader = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
            <div className="text-center">
                {/* Animated Spinner */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-slate-700 rounded-full animate-spin border-t-indigo-500 mx-auto"></div>
                        <div className="w-16 h-16 border-4 border-slate-800 rounded-full animate-spin border-t-purple-500 mx-auto absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                        Waking up backend...
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Please wait while we initialize the server. This may take a few moments on first load.
                    </p>

                    {/* Animated dots */}
                    <div className="flex justify-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-8 w-64 mx-auto">
                    <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackendWakeupLoader