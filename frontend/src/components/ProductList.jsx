import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function ProductList({ setNotification, searchQuery, darkMode }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  // Charger les produits
  const loadProducts = () => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(error => {
        console.error('Erreur:', error)
        setNotification({ message: "Erreur de chargement", type: "error" })
      })
  }

  // Supprimer un produit
  const handleDelete = async () => {
    if (!productToDelete) return
    
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productToDelete}/`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNotification({ message: "Produit supprimé", type: "success" })
        loadProducts()
      } else {
        throw new Error('Échec de la suppression')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setNotification({ message: "Échec de la suppression", type: "error" })
    } finally {
      setProductToDelete(null)
    }
  }

  // Préparer la modification
  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  // Filtrer les produits
  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredProducts(filtered)
  }, [searchQuery, products])

  // Chargement initial
  useEffect(() => { loadProducts() }, [])

  return (
    <div className={`p-4 mx-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Liste des produits</h3>
        <button
          onClick={() => {
            setEditingProduct(null)
            setShowProductForm(true)
          }}
          className={`px-4 py-2 rounded-full shadow transition ${
            darkMode 
              ? 'bg-green-700 hover:bg-green-800 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Ajouter un produit
        </button>
      </div>

      {/* Conteneur avec défilement horizontal */}
      <div className={`overflow-x-auto rounded-lg shadow border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <table className={`min-w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <tr>
              <th className={`px-4 py-3 text-left border-b sticky top-0 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
              }`}>Nom</th>
              <th className={`px-4 py-3 text-left border-b sticky top-0 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
              }`}>Catégorie</th>
              <th className={`px-4 py-3 text-left border-b sticky top-0 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
              }`}>Prix</th>
              <th className={`px-4 py-3 text-left border-b sticky top-0 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
              }`}>Quantité</th>
              <th className={`px-4 py-3 text-left border-b sticky top-0 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
              }`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr 
                key={product.id} 
                className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
              >
                <td className={`px-4 py-3 border-b align-middle whitespace-nowrap ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {product.name}
                </td>
                <td className={`px-4 py-3 border-b align-middle whitespace-nowrap ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {product.category?.name || '-'}
                </td>
                <td className={`px-4 py-3 border-b align-middle whitespace-nowrap ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {product.price} FCFA
                </td>
                <td className={`px-4 py-3 border-b align-middle font-bold whitespace-nowrap ${
                  product.quantity <= 5 
                    ? 'text-red-500' 
                    : darkMode 
                      ? 'text-white' 
                      : 'text-black'
                } ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {product.quantity}
                </td>
                <td className={`px-4 py-3 border-b align-middle whitespace-nowrap ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => handleEdit(product)}
                      className={`cursor-pointer p-2 rounded-full transition-colors ${
                        darkMode 
                          ? 'text-blue-400 hover:bg-gray-600' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Modifier"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      onClick={() => setProductToDelete(product.id)}
                      className={`cursor-pointer p-2 rounded-full transition-colors ${
                        darkMode 
                          ? 'text-red-400 hover:bg-gray-600' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title="Supprimer"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de suppression */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-md w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Confirmer la suppression
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className={`px-4 py-2 rounded cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 rounded cursor-pointer ${
                  darkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire d'édition/ajout */}
      {showProductForm && (
        <ProductForm
          onClose={() => {
            setShowProductForm(false)
            setEditingProduct(null)
          }}
          onSuccess={() => {
            loadProducts()
            setNotification({ 
              message: editingProduct ? 'Produit modifié avec succès' : 'Produit ajouté avec succès', 
              type: 'success' 
            })
            setShowProductForm(false)
            setEditingProduct(null)
          }}
          productToEdit={editingProduct}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}