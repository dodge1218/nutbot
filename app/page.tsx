import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-100 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              Now with AI Food Recognition
            </span>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Nutrition Tracking <br />
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stop counting calories. Start optimizing your health. 
              NutBot helps you identify nutrient gaps and improve your gut health with AI-powered insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Link 
              href="/log-food"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl text-lg font-bold hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Tracking Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why NutBot?</h2>
            <p className="text-lg text-gray-600">Everything you need to optimize your nutrition</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🥗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Food Logging</h3>
              <p className="text-gray-600 leading-relaxed">
                Log meals in seconds with our extensive database. We automatically calculate macros, micros, and gut health impact.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🧬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gut Health Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Track fiber diversity, fermented foods, and polyphenol intake to optimize your microbiome health.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nutrient Gap Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Identify missing vitamins and minerals. Get personalized food recommendations to fill your specific gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your diet?</h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their nutrition with NutBot.
            </p>
            <Link 
              href="/signup"
              className="inline-block bg-white text-primary-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
