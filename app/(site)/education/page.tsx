export default function EducationPage() {
  const articles = [
    {
      slug: 'iron-vitamin-c-synergy',
      title: 'Why Vitamin C Boosts Iron Absorption',
      description: 'Learn how pairing iron-rich foods with vitamin C can dramatically improve absorption.',
      category: 'Synergies',
      readTime: 3,
      level: 'Beginner',
    },
    {
      slug: 'gut-health-basics',
      title: 'Gut Health 101: Fiber, Fermentation, and Diversity',
      description: 'The three pillars of a healthy gut microbiome.',
      category: 'Gut Health',
      readTime: 4,
      level: 'Beginner',
    },
    {
      slug: 'calcium-iron-timing',
      title: 'Calcium and Iron: Timing Matters',
      description: 'Why you should space these nutrients apart.',
      category: 'Timing',
      readTime: 3,
      level: 'Intermediate',
    },
    {
      slug: 'magnesium-benefits',
      title: 'Magnesium: The Relaxation Mineral',
      description: 'Why most people need more magnesium and how to get it.',
      category: 'Minerals',
      readTime: 4,
      level: 'Beginner',
    },
  ];

  const categories = ['All', 'Synergies', 'Gut Health', 'Timing', 'Vitamins', 'Minerals'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Education Center 📚</h2>
            <p className="mt-2 text-primary-100 text-lg">
              Learn about nutrient synergies, timing, and how to optimize your nutrition
            </p>
          </div>
          <div className="hidden md:block text-6xl opacity-20">
            🎓
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🔖</span>
          <h3 className="text-xl font-bold text-gray-900">Browse by Category</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="px-5 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 rounded-xl text-sm font-semibold hover:shadow-md transform hover:-translate-y-0.5 transition-all border border-primary-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-primary-200 group"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-xs font-semibold rounded-full">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                {article.level}
              </span>
              <span className="flex items-center text-xs text-gray-500 ml-auto">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} min
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{article.title}</h3>
            <p className="text-gray-600 mb-5 leading-relaxed">{article.description}</p>

            <a
              href={`/education/${article.slug}`}
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group-hover:translate-x-1 transition-transform"
            >
              Read More
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      {/* Key Concepts */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">🔑</span>
          <h3 className="text-xl font-bold text-gray-900">Key Nutrition Concepts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-green-100/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🤝</span>
              <h4 className="font-bold text-green-900 text-lg">Nutrient Synergy</h4>
            </div>
            <p className="text-sm text-green-800 leading-relaxed">
              Some nutrients work better together (e.g., iron + vitamin C, calcium + vitamin D)
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⚠️</span>
              <h4 className="font-bold text-yellow-900 text-lg">Anti-Synergy</h4>
            </div>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Some nutrients compete for absorption (e.g., calcium + iron, coffee + iron)
            </p>
          </div>

          <div className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⏰</span>
              <h4 className="font-bold text-blue-900 text-lg">Meal Timing</h4>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              When you eat matters — spacing certain nutrients can improve absorption
            </p>
          </div>

          <div className="border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🦠</span>
              <h4 className="font-bold text-purple-900 text-lg">Gut Microbiome</h4>
            </div>
            <p className="text-sm text-purple-800 leading-relaxed">
              Fiber, fermented foods, and plant diversity support beneficial gut bacteria
            </p>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">📚</span>
          <h3 className="text-2xl font-bold">Popular Learning Paths</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
            <span className="text-2xl mr-3 flex-shrink-0">1️⃣</span>
            <div>
              <div className="font-semibold text-lg">Understanding Iron Absorption</div>
              <div className="text-primary-100 text-sm mt-1">4 articles • 15 min</div>
            </div>
          </div>
          <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
            <span className="text-2xl mr-3 flex-shrink-0">2️⃣</span>
            <div>
              <div className="font-semibold text-lg">Building a Gut-Healthy Diet</div>
              <div className="text-primary-100 text-sm mt-1">6 articles • 24 min</div>
            </div>
          </div>
          <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
            <span className="text-2xl mr-3 flex-shrink-0">3️⃣</span>
            <div>
              <div className="font-semibold text-lg">Optimizing Vitamin D Levels</div>
              <div className="text-primary-100 text-sm mt-1">3 articles • 12 min</div>
            </div>
          </div>
          <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
            <span className="text-2xl mr-3 flex-shrink-0">4️⃣</span>
            <div>
              <div className="font-semibold text-lg">Nutrient Timing for Athletes</div>
              <div className="text-primary-100 text-sm mt-1">5 articles • 20 min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
