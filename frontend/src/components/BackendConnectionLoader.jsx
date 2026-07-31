import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';

const BackendConnectionLoader = ({ children }) => {
    const { backendConnected, connectionAttempts, waitForBackend, err } = useAuthStore();
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        const connectToBackend = async () => {
            setIsConnecting(true);
            await waitForBackend();
            setIsConnecting(false);
        };

        if (!backendConnected) {
            connectToBackend();
        } else {
            setIsConnecting(false);
        }
    }, [backendConnected, waitForBackend]);

    if (isConnecting && !backendConnected) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Jeevanta</h1>
                        <p className="text-slate-300 text-lg">Connecting to server...</p>
                    </div>

                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 max-w-md mx-auto">
                        <div className="mb-4">
                            <div className="flex items-center justify-center space-x-1 mb-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Attempt {connectionAttempts} - Waking up backend server...
                            </p>
                        </div>

                        <div className="text-xs text-slate-500 space-y-1">
                            <p>Backend is hosted on Render.com (free tier)</p>
                            <p>Server may take 1-2 minutes to wake up</p>
                            <p>Please wait while we establish connection</p>
                        </div>
                    </div>

                    {err && (
                        <div className="mt-6 p-4 bg-red-900/50 border border-red-700/50 rounded-xl text-red-300 text-sm max-w-md mx-auto">
                            <p className="font-semibold mb-1">Connection Failed</p>
                            <p>{err}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-xs font-medium transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return children;
};

export default BackendConnectionLoader;