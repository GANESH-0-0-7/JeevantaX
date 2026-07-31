const JeevantaX = () => {
    const telegramBotLink = "https://t.me/JeevaMitra_bot";

    return (
        <div className="w-full h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-hidden">
            <div className="h-full flex">
                <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-slate-900/50 border-r border-slate-800">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">JeevantaBot</h1>
                        <p className="text-xl mb-8 text-slate-300 max-w-md">
                            JeevaMitra Bot is your AI-powered personal nutrition coach that creates tailored diet plans to help you achieve your health goals effortlessly.
                        </p>

                        <div className="mb-8">
                            <a
                                href={telegramBotLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block transform hover:scale-110 transition-transform duration-300"
                            >
                                <div className="bg-slate-800 border border-slate-700 rounded-full p-6 shadow-xl hover:bg-slate-700 transition-colors">
                                    <svg
                                        className="w-20 h-20 md:w-24 md:h-24 text-indigo-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                        <a
                            href={telegramBotLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                        >
                            Chat with JeevantaBot
                        </a>

                        <div className="mt-8 flex justify-center space-x-6 text-sm text-slate-400">
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                24/7 Available
                            </span>
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                                AI-Powered
                            </span>
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                Personalized
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-slate-900/30">
                    <div className="space-y-6 w-full max-w-md">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">Nutrition Made Simple</h2>
                            <p className="text-slate-400">Personalized diet plans powered by AI</p>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl border border-slate-800 shadow-xl bg-slate-800/50 p-6 hover:bg-slate-800/70 transition-colors duration-300">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold">Smart Nutrition Analysis</h3>
                                </div>
                                <p className="text-slate-300 text-sm">Get instant nutritional insights and personalized meal recommendations</p>
                            </div>

                            <div className="rounded-xl border border-slate-800 shadow-xl bg-slate-800/50 p-6 hover:bg-slate-800/70 transition-colors duration-300">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold">Custom Diet Plans</h3>
                                </div>
                                <p className="text-slate-300 text-sm">Tailored meal plans based on your health goals and preferences</p>
                            </div>

                            <div className="rounded-xl border border-slate-800 shadow-xl bg-slate-800/50 p-6 hover:bg-slate-800/70 transition-colors duration-300">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold">24/7 Support</h3>
                                </div>
                                <p className="text-slate-300 text-sm">Always available to answer your nutrition questions and provide guidance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JeevantaX