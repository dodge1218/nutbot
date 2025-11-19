import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Free Nutrition Tracker
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Nutrition.
            <br />
            <span className="text-primary-600">Optimize Health.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Log meals, track 23+ nutrients, and get personalized recommendations for better gut health.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/log-food" className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors">
              Start Tracking
            </Link>
            <Link href="/dashboard" className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors">
              View Demo
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">No signup • Free forever</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-2">23+ Nutrients</h3>
            <p className="text-gray-600 text-sm">Track macros, vitamins, minerals, and more.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-2">Gut Health Score</h3>
            <p className="text-gray-600 text-sm">0-100 score based on fiber and fermented foods.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-2">Quick Logging</h3>
            <p className="text-gray-600 text-sm">Log meals in 30 seconds with smart search.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
