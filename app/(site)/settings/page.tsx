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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="mt-2 text-gray-600">
          Customize your profile for personalized nutrition recommendations
        </p>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">👤 Your Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select
              value={profile.sex}
              onChange={(e) => setProfile({ ...profile, sex: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select
              value={profile.activityLevel}
              onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very_active">Very Active (intense daily)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Pattern</label>
            <select
              value={profile.dietaryPattern}
              onChange={(e) => setProfile({ ...profile, dietaryPattern: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="omnivore">Omnivore</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescatarian">Pescatarian</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚙️ Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show Supplement Suggestions</h4>
              <p className="text-sm text-gray-600">
                Display product recommendations for detected nutrient gaps
              </p>
            </div>
            <button
              onClick={() =>
                setProfile({ ...profile, showSupplements: !profile.showSupplements })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profile.showSupplements ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile.showSupplements ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Wearables Integration (Stubbed) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⌚ Wearable Integrations</h3>
        <p className="text-gray-600 mb-4">
          Connect your fitness trackers for enhanced insights (coming in v2.0)
        </p>
        <div className="space-y-3">
          <button className="w-full p-4 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-primary-300 opacity-50 cursor-not-allowed">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full mr-3"></div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Apple Health</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </button>

          <button className="w-full p-4 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-primary-300 opacity-50 cursor-not-allowed">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full mr-3"></div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Fitbit</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Coming Soon</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
        >
          Save Changes
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );
}
