'use client';

import { useState } from 'react';
import { FOODS_DATABASE, COMMON_MEALS, searchFoods } from '@/data/foods';

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
    const foodIds = (COMMON_MEALS as any)[mealName];
    const foods = foodIds
      .map((id: string) => FOODS_DATABASE.find(f => f.id === id))
      .filter(Boolean);
    
    setSelectedFoods([
      ...selectedFoods,
      ...foods.map(f => ({ ...f, timestamp: new Date() })),
    ]);
  };

  const handleSubmit = () => {
    // In production, save to database via API
    console.log('Saving foods:', selectedFoods);
    alert(`Logged ${selectedFoods.length} food items!`);
    setSelectedFoods([]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Log Your Food</h2>
        <p className="mt-2 text-gray-600">
          Quick and easy food tracking. Search for foods or use common meal presets.
        </p>
      </div>

      {/* Common Meals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Add: Common Meals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.keys(COMMON_MEALS).map((mealName) => (
            <button
              key={mealName}
              onClick={() => loadCommonMeal(mealName)}
              className="bg-primary-50 text-primary-700 px-4 py-3 rounded-lg font-medium hover:bg-primary-100 border border-primary-200"
            >
              {mealName}
            </button>
          ))}
        </div>
      </div>

      {/* Search Foods */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Search Foods</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for foods (e.g., 'chicken', 'spinach', 'oats')..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {searchResults.map((food) => (
                <button
                  key={food.id}
                  onClick={() => addFood(food)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{food.name}</div>
                  <div className="text-sm text-gray-500">
                    {food.servingSize} • {food.calories} kcal
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📝 Items to Log ({selectedFoods.length})
          </h3>
          <div className="space-y-2 mb-6">
            {selectedFoods.map((food, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{food.name}</div>
                  <div className="text-sm text-gray-500">
                    {food.servingSize} • {food.calories} kcal • 
                    Protein: {food.protein}g • Fiber: {food.fiber}g
                  </div>
                </div>
                <button
                  onClick={() => removeFood(index)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
            >
              Save {selectedFoods.length} Item{selectedFoods.length !== 1 ? 's' : ''}
            </button>
            <button
              onClick={() => setSelectedFoods([])}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for Better Tracking</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Log foods as you eat them for better accuracy</li>
          <li>Use common meal presets to save time</li>
          <li>Don't stress about perfection — close estimates are fine</li>
          <li>Track consistently to identify patterns over time</li>
        </ul>
      </div>
    </div>
  );
}
