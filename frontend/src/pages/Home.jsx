import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Searchbar from '../components/Searchbar';
import Notification from '../components/Notification';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Vérifie le localStorage ou la préférence système au chargement
    return localStorage.getItem('darkMode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Applique le dark mode au document et sauvegarde la préférence
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="p-4 mx-4">
        <h2 className={`text-2xl font-semibold mt-6 mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Bienvenue sur Inventorix
        </h2>
        <p className={`text-base lg:w-150 w-80 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Inventorix est une solution simple et rapide pour gérer vos stocks de produits.
        </p>
      </div>
      
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} />
      
      <ProductList 
        showModal={showModal}
        setShowModal={setShowModal}
        setNotification={setNotification}
        searchQuery={searchQuery}
        darkMode={darkMode}
      />

      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}