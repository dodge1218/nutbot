import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white -mx-4 sm:-mx-6 lg:-mx-8 -my-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
        <div className="mb-8">
          <span className="inline-block bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200">
            Free Forever
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Track Your Nutrition
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Simple nutrition tracking with gut health scoring
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/log-food"
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Tracking
          </Link>
          <Link 
            href="/dashboard"
            className="inline-block bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all shadow-md"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 py-16">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">23+ Nutrients</h3>
          <p className="text-gray-600">Track macros, vitamins, minerals, and more</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gut Health Score</h3>
          <p className="text-gray-600">0-100 score based on fiber and diversity</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Logging</h3>
          <p className="text-gray-600">Log meals in 30 seconds</p>
        </div>
      </div>
    </div>
  );
}
