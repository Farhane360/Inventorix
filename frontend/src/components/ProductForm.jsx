import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ProductForm({ onClose, onSuccess, productToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    description: '',
    price: ''
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialiser les valeurs si en mode édition
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        quantity: productToEdit.quantity,
        category: productToEdit.category?.id || '',
        description: productToEdit.description,
        price: productToEdit.price
      });
    }
  }, [productToEdit]);

  // Charger les catégories
  useEffect(() => {
    fetch('http://localhost:8000/api/categories/')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = productToEdit 
        ? `http://localhost:8000/api/products/${productToEdit.id}/`
        : 'http://localhost:8000/api/products/';
      
      const method = productToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          price: Number(formData.price),
          category_id: formData.category || null
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert('Erreur lors de l\'opération');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {productToEdit ? 'Modifier le produit' : 'Ajouter un produit'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          
          <input
            type="number"
            name="quantity"
            placeholder="Quantité"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Prix"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded cursor-pointer ${
                isSubmitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'En cours...' : (productToEdit ? 'Modifier' : 'Enregistrer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}