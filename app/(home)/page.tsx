import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-600">NutBot</div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-emerald-600">Dashboard</Link>
            <Link href="/log-food" className="text-gray-600 hover:text-emerald-600">Log Food</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mb-6">
          <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
            Free Forever
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Track Your Nutrition.<br />
          <span className="text-emerald-600">Optimize Your Health.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Simple nutrition tracking with 23+ nutrients, gut health scoring, and personalized recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            href="/log-food"
            className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">23+ Nutrients</h3>
            <p className="text-gray-600 text-sm">Track macros, vitamins, minerals, and more.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Gut Health Score</h3>
            <p className="text-gray-600 text-sm">0-100 score based on fiber and diversity.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Logging</h3>
            <p className="text-gray-600 text-sm">Log meals in 30 seconds.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-8 text-center text-sm text-gray-500">
        <p>© 2025 NutBot. All rights reserved.</p>
      </footer>
    </div>
  );
}
