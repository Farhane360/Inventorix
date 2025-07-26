import React from 'react'

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="flex justify-between items-center mt-6 px-4">
      <div className={`${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-green-600'} shadow-md rounded-full px-8 py-3`}>
        <h1 className="text-xl font-bold">Inventorix</h1>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
        title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}