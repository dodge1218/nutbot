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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Education Center</h2>
        <p className="mt-2 text-gray-600">
          Learn about nutrient synergies, timing, and how to optimize your nutrition
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-100 border border-primary-200"
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
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                {article.category}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                {article.level}
              </span>
              <span className="text-xs text-gray-500">{article.readTime} min read</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.description}</p>

            <a
              href={`/education/${article.slug}`}
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      {/* Key Concepts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔑 Key Nutrition Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <h4 className="font-bold text-green-900">Nutrient Synergy</h4>
            <p className="text-sm text-green-800 mt-1">
              Some nutrients work better together (e.g., iron + vitamin C, calcium + vitamin D)
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
            <h4 className="font-bold text-yellow-900">Anti-Synergy</h4>
            <p className="text-sm text-yellow-800 mt-1">
              Some nutrients compete for absorption (e.g., calcium + iron, coffee + iron)
            </p>
          </div>

          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <h4 className="font-bold text-blue-900">Meal Timing</h4>
            <p className="text-sm text-blue-800 mt-1">
              When you eat matters — spacing certain nutrients can improve absorption
            </p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
            <h4 className="font-bold text-purple-900">Gut Microbiome</h4>
            <p className="text-sm text-purple-800 mt-1">
              Fiber, fermented foods, and plant diversity support beneficial gut bacteria
            </p>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">📚 Popular Learning Paths</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="mr-2">1.</span>
            <span>Understanding Iron Absorption (4 articles)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">2.</span>
            <span>Building a Gut-Healthy Diet (6 articles)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">3.</span>
            <span>Optimizing Vitamin D Levels (3 articles)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">4.</span>
            <span>Nutrient Timing for Athletes (5 articles)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
