'use client';

import { useState } from 'react';
import { FOODS_DATABASE, COMMON_MEALS, searchFoods } from '@/data/foods';
import PageTransition from '@/components/PageTransition';
import FoodPhotoUpload from '@/components/FoodPhotoUpload';

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

  const handleSubmit = async () => {
    if (selectedFoods.length === 0) return;

    try {
      const response = await fetch('/api/log-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foods: selectedFoods }),
      });

      if (response.ok) {
        alert(`Successfully logged ${selectedFoods.length} food items!`);
        setSelectedFoods([]);
        setSearchQuery('');
        setSearchResults([]);
      } else {
        const data = await response.json();
        if (response.status === 401) {
          alert('Please sign in to log your food.');
        } else {
          alert(`Error: ${data.error || 'Failed to log food'}`);
        }
      }
    } catch (error) {
      console.error('Error submitting foods:', error);
      alert('An error occurred while logging your food. Please try again.');
    }
  };

  const handleFoodsRecognized = (recognizedItems: any[]) => {
    // Add recognized foods to selected foods
    const foodsToAdd = recognizedItems.map((item) => ({
      id: item.matchedFoodId || `ai-${Date.now()}-${Math.random()}`,
      name: item.foodName,
      category: item.category,
      calories: item.nutrients?.calories || 0,
      protein: item.nutrients?.protein || 0,
      carbs: item.nutrients?.carbs || 0,
      fat: item.nutrients?.fat || 0,
      fiber: item.nutrients?.fiber || 0,
      servingSize: `${item.portionEstimate.amount} ${item.portionEstimate.unit}`,
      timestamp: new Date(),
      aiRecognized: true,
      confidence: item.confidence,
    }));
    
    setSelectedFoods([...selectedFoods, ...foodsToAdd]);
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
          <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
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
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>{mealName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Photo Upload */}
      <FoodPhotoUpload onFoodsRecognized={handleFoodsRecognized} />

      {/* Search Foods */}
            {/* Quick Add Buttons */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quick Add</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FOODS_DATABASE.slice(0, 6).map((food) => (
            <button
              key={food.id}
              onClick={() => addFood(food)}
              className="group p-4 bg-gradient-to-br from-gray-50 to-white hover:from-primary-50 hover:to-primary-100 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{food.name.charAt(0)}</div>
                <div className="text-xs font-semibold text-gray-700 group-hover:text-primary-700 transition-colors">{food.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Foods */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Search Foods</h3>
        </div>
        <div className="relative">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for foods (e.g., 'chicken', 'spinach', 'oats')..."
              className="w-full px-14 py-5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300 text-lg shadow-sm hover:shadow-md group-hover:border-gray-300"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => {setSearchQuery(''); setSearchResults([]);}}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-3 bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
              {searchResults.map((food) => (
                <button
                  key={food.id}
                  onClick={() => addFood(food)}
                  className="w-full text-left px-6 py-5 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 border-b border-gray-100 last:border-b-0 transition-all duration-200 group/item"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 group-hover/item:text-primary-700 transition-colors text-lg">{food.name}</div>
                      <div className="text-sm text-gray-600 mt-1 flex items-center gap-3">
                        <span className="font-semibold">{food.servingSize}</span>
                        <span>•</span>
                        <span className="font-semibold text-primary-600">{food.calories} kcal</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform duration-300 shadow-sm">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-primary-200 hover:border-primary-300 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Items to Log ({selectedFoods.length})
            </h3>
          </div>
          <div className="space-y-3 mb-6">
            {selectedFoods.map((food, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 group border border-gray-200 hover:border-primary-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
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
                  className="ml-4 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 hover:text-red-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white px-8 py-5 rounded-xl font-bold hover:shadow-2xl hover:shadow-primary-300 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 text-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save {selectedFoods.length} Item{selectedFoods.length !== 1 ? 's' : ''}
              </span>
            </button>
            <button
              onClick={() => setSelectedFoods([])}
              className="px-8 py-5 border-2 border-gray-300 rounded-xl font-bold hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
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
