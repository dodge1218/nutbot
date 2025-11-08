'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@nutbot.app',
    age: 30,
    sex: 'female',
    weight: 65,
    height: 165,
    activityLevel: 'moderate',
    dietaryPattern: 'omnivore',
    showSupplements: true,
  });

  const handleSave = () => {
    // In production, save to database via API
    console.log('Saving profile:', profile);
    alert('Settings saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Settings ⚙️</h2>
            <p className="mt-2 text-primary-100 text-lg">
              Customize your profile for personalized nutrition recommendations
            </p>
          </div>
          <div className="hidden md:block text-6xl opacity-20">
            👤
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">👤</span>
          <h3 className="text-xl font-bold text-gray-900">Your Profile</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
            <select
              value={profile.sex}
              onChange={(e) => setProfile({ ...profile, sex: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
            <select
              value={profile.activityLevel}
              onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="sedentary">🛋️ Sedentary (little/no exercise)</option>
              <option value="light">🚶 Light (1-3 days/week)</option>
              <option value="moderate">🏃 Moderate (3-5 days/week)</option>
              <option value="active">💪 Active (6-7 days/week)</option>
              <option value="very_active">🔥 Very Active (intense daily)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Pattern</label>
            <select
              value={profile.dietaryPattern}
              onChange={(e) => setProfile({ ...profile, dietaryPattern: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="omnivore">🍖 Omnivore</option>
              <option value="vegetarian">🥗 Vegetarian</option>
              <option value="vegan">🌱 Vegan</option>
              <option value="pescatarian">🐟 Pescatarian</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">⚙️</span>
          <h3 className="text-xl font-bold text-gray-900">Preferences</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Show Supplement Suggestions</h4>
              <p className="text-sm text-gray-600">
                Display product recommendations for detected nutrient gaps
              </p>
            </div>
            <button
              onClick={() =>
                setProfile({ ...profile, showSupplements: !profile.showSupplements })
              }
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors shadow-inner ${
                profile.showSupplements ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                  profile.showSupplements ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Wearables Integration (Stubbed) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">⌚</span>
          <h3 className="text-xl font-bold text-gray-900">Wearable Integrations</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Connect your fitness trackers for enhanced insights (coming in v2.0)
        </p>
        <div className="space-y-3">
          <button className="w-full p-5 border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 opacity-60 cursor-not-allowed bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mr-4 flex items-center justify-center text-2xl">
                
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Apple Health</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Coming Soon</span>
          </button>

          <button className="w-full p-5 border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 opacity-60 cursor-not-allowed bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mr-4 flex items-center justify-center text-2xl">
                📊
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Fitbit</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Coming Soon</span>
          </button>

          <button className="w-full p-5 border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 opacity-60 cursor-not-allowed bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mr-4 flex items-center justify-center text-2xl">
                🏃
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Garmin</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Coming Soon</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-lg"
        >
          💾 Save Changes
        </button>
        <button className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
}
