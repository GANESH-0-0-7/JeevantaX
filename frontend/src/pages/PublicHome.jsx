import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaShieldAlt, FaRobot, FaUserMd, FaSearch } from 'react-icons/fa'

const PublicHome = () => {
    const features = [
        {
            icon: <FaCalendarAlt className="w-8 h-8" />,
            title: 'Smart Appointment Booking',
            desc: 'AI-powered doctor recommendations based on your symptoms and medical history.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: 'Secure Medical Vault',
            desc: 'End-to-end encrypted storage on IPFS for your medical records and documents.',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: <FaRobot className="w-8 h-8" />,
            title: 'AI Health Assistant',
            desc: 'Google Gemini-powered symptom analysis and personalized health guidance.',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: <FaUserMd className="w-8 h-8" />,
            title: 'Expert Network',
            desc: 'Connect with qualified doctors and healthcare professionals instantly.',
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: <FaSearch className="w-8 h-8" />,
            title: 'Find Specialists',
            desc: 'Locate therapists and mental health professionals in your area.',
            color: 'from-pink-500 to-pink-600'
        }
    ]

    return (
        <div className='w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100'>

            {/* Hero Section */}
            <section className='w-full flex flex-col items-center justify-center text-center px-4 md:px-12 py-16 md:py-24'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'>
                        AI-Powered Healthcare Platform
                    </h1>
                    <p className='text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed'>
                        Experience the future of healthcare with intelligent appointment booking, secure medical records, and AI-powered health guidance—all in one platform.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Link
                            to='/select'
                            className='px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to='/login'
                            className='px-8 py-4 rounded-xl border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 font-semibold text-lg transition-all duration-300'
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='px-4 md:px-12 py-16'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl md:text-5xl font-bold text-slate-100 mb-6'>
                            Revolutionary Healthcare Features
                        </h2>
                        <p className='text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed'>
                            Cutting-edge technology meets healthcare to provide you with the most advanced medical assistance platform
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <div key={index} className='group'>
                                <div className='bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-slate-900/70'>
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className='text-2xl font-bold text-slate-100 mb-4 group-hover:text-white transition-colors'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors'>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className='px-4 md:px-12 py-16'>
                <div className='max-w-6xl mx-auto text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold text-slate-100 mb-12'>
                        Powered by Advanced Technology
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        <div className='bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50'>
                            <div className='text-2xl font-bold text-indigo-400 mb-2'>Google Gemini AI</div>
                            <div className='text-slate-300 text-sm'>Advanced medical analysis</div>
                        </div>
                        <div className='bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50'>
                            <div className='text-2xl font-bold text-green-400 mb-2'>IPFS Storage</div>
                            <div className='text-slate-300 text-sm'>Decentralized security</div>
                        </div>
                        <div className='bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50'>
                            <div className='text-2xl font-bold text-purple-400 mb-2'>End-to-End Encryption</div>
                            <div className='text-slate-300 text-sm'>Military-grade protection</div>
                        </div>
                        <div className='bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50'>
                            <div className='text-2xl font-bold text-orange-400 mb-2'>Real-time Sync</div>
                            <div className='text-slate-300 text-sm'>Instant updates</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-4 md:px-12 py-16'>
                <div className='max-w-4xl mx-auto'>
                    <div className='bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 text-center'>
                        <h3 className='text-3xl md:text-4xl font-bold text-slate-100 mb-4'>
                            Ready to revolutionize your healthcare?
                        </h3>
                        <p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
                            Join thousands of users who trust Jeevanta for their healthcare needs. Get started today and experience the future of medical care.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                            <Link
                                to='/select'
                                className='px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                to='/login'
                                className='px-10 py-4 rounded-xl border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 font-bold text-lg transition-all duration-300'
                            >
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='px-4 md:px-12 py-12 border-t border-slate-800/50'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600'></div>
                            <span className='text-2xl font-bold text-slate-200'>Jeevanta</span>
                        </div>
                        <div className='text-slate-400 text-sm'>
                            &copy; {new Date().getFullYear()} Jeevanta. All rights reserved. Built with AI-powered healthcare technology.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default PublicHome