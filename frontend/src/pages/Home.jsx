import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaShieldAlt, FaRobot, FaUserMd, FaSearch } from 'react-icons/fa'

const Home = () => {
  const features = [
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: 'Appointment Booking',
      desc: 'Book appointments effortlessly with top doctors using our AI-powered recommendation system.',
      route: '/book',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Jeevanta Vault',
      desc: 'Securely store and access your medical records with end-to-end encryption on IPFS.',
      route: '/vault',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: 'CareMate',
      desc: 'AI-assisted healthcare guidance powered by Google Gemini for accurate symptom analysis.',
      route: '/symptom',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: 'JeevantaX',
      desc: 'AI-powered health assistant for personalized medical guidance and support.',
      route: '/JeevantaX',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: 'Therapist Finder',
      desc: 'Find qualified therapists and mental health professionals near you with ease.',
      route: '/therapist-finder',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] bg-black text-slate-100'>

      <section className='w-full flex flex-col items-center justify-center text-center px-4 md:px-12 py-16 md:py-24'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'>
            Care that meets you where you are
          </h1>
          <p className='text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed'>
            Jeevanta brings AI-powered appointments, secure medical records, and intelligent health guidance together—so you can focus on feeling better, not managing apps.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              to='/book'
              className='px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            >
              Book Appointment
            </Link>
            <Link
              to='/symptom'
              className='px-8 py-4 rounded-xl border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 font-semibold text-lg transition-all duration-300'
            >
              Ask CareMate
            </Link>
          </div>
        </div>
      </section>

      <section className='px-4 md:px-12 py-16'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-100 mb-6'>
              Powerful Features
            </h2>
            <p className='text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed'>
              Everything you need to manage your healthcare intelligently with cutting-edge AI technology
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <Link to={feature.route} key={index} className='block group'>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 md:px-12 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-indigo-400 mb-2'>AI-Powered</div>
              <div className='text-slate-300 text-lg'>Smart Health Recommendations</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-green-400 mb-2'>Secure</div>
              <div className='text-slate-300 text-lg'>End-to-End Encrypted Storage</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-purple-400 mb-2'>24/7</div>
              <div className='text-slate-300 text-lg'>Available Health Assistant</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home
