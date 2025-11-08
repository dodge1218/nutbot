'use client';

import { useState } from 'react';
import { FOODS_DATABASE, COMMON_MEALS, searchFoods } from '@/data/foods';
import PageTransition from '@/components/PageTransition';

export default function LogFoodPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = searchFoods(query);
      setSearchResults(results.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const addFood = (food: any) => {
    setSelectedFoods([...selectedFoods, { ...food, timestamp: new Date() }]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  const loadCommonMeal = (mealName: string) => {
    const mealFoodIds = COMMON_MEALS[mealName as keyof typeof COMMON_MEALS];
    const foods = mealFoodIds
      .map((id: string) => FOODS_DATABASE.find((f: any) => f.id === id))
      .filter(Boolean) as any[];
    
    setSelectedFoods([
      ...selectedFoods,
      ...foods.map((f: any) => ({ ...f, timestamp: new Date() })),
    ]);
  };

  const handleSubmit = () => {
    // In production, save to database via API
    console.log('Saving foods:', selectedFoods);
    alert(`Logged ${selectedFoods.length} food items!`);
    setSelectedFoods([]);
  };

  return (
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
          </svg>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Log Your Food</h2>
            </div>
            <p className="mt-2 text-primary-100 text-lg ml-15">
              Quick and easy food tracking. Search for foods or use common meal presets.
            </p>
          </div>
          {selectedFoods.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-3xl font-bold">{selectedFoods.length}</div>
              <div className="text-sm text-primary-100">items ready</div>
            </div>
          )}
        </div>
      </div>

      {/* Common Meals */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">⚡</span>
          <h3 className="text-xl font-bold text-gray-900">Quick Add: Common Meals</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.keys(COMMON_MEALS).map((mealName) => (
            <button
              key={mealName}
              onClick={() => loadCommonMeal(mealName)}
              className="group relative bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 px-4 py-4 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all border border-primary-200"
            >
              <div className="flex items-center justify-center">
                <span className="text-2xl mr-2">🍴</span>
                <span>{mealName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Foods */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🔍</span>
          <h3 className="text-xl font-bold text-gray-900">Search Foods</h3>
        </div>
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for foods (e.g., 'chicken', 'spinach', 'oats')..."
              className="w-full px-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => {setSearchQuery(''); setSearchResults([]);}}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
              {searchResults.map((food) => (
                <button
                  key={food.id}
                  onClick={() => addFood(food)}
                  className="w-full text-left px-5 py-4 hover:bg-primary-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-primary-700">{food.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {food.servingSize} • {food.calories} kcal
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-primary-200">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📝</span>
            <h3 className="text-xl font-bold text-gray-900">
              Items to Log ({selectedFoods.length})
            </h3>
          </div>
          <div className="space-y-2 mb-6">
            {selectedFoods.map((food, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all group border border-gray-200"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-semibold text-gray-900">{food.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {food.servingSize} • {food.calories} kcal
                        {food.protein ? ` • Protein: ${food.protein}g` : ''}
                        {food.fiber ? ` • Fiber: ${food.fiber}g` : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFood(index)}
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-lg"
            >
              💾 Save {selectedFoods.length} Item{selectedFoods.length !== 1 ? 's' : ''}
            </button>
            <button
              onClick={() => setSelectedFoods([])}
              className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💡</span>
          <div>
            <h4 className="font-bold text-blue-900 mb-3 text-lg">Tips for Better Tracking</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Log foods as you eat them for better accuracy</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Use common meal presets to save time</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Don't stress about perfection — close estimates are fine</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Track consistently to identify patterns over time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
