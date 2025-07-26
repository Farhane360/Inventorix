import React from 'react'

export default function Searchbar({ searchQuery, setSearchQuery, darkMode }) {
  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`w-full border rounded-full px-4 py-2 focus:outline-none focus:ring ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-600' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400'
        }`}
      />
    </div>
  )
}