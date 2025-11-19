import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              Free Forever • No Sign Up Required
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Track Your Nutrition.<br />
            <span className="text-emerald-600">Optimize Your Health.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Simple nutrition tracking with 23+ nutrients, gut health scoring, and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/log-food"
              className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Start Tracking
            </Link>
            <Link 
              href="/dashboard"
              className="inline-block bg-white text-emerald-600 border-2 border-emerald-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">23+ Nutrients Tracked</h3>
              <p className="text-gray-600">Monitor macros, vitamins, minerals, fiber, and more with detailed daily breakdowns.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gut Health Score</h3>
              <p className="text-gray-600">Get a 0-100 score based on fiber intake, fermented foods, and plant diversity.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Log entire meals in under 30 seconds with smart search and common meal presets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
