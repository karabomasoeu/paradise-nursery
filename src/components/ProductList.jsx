import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import Navbar from './Navbar';

const plants = [
  // Tropical
  {
    id: 1, category: 'Tropical', name: 'Monstera Deliciosa', price: 24.99,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
  },
  {
    id: 2, category: 'Tropical', name: 'Bird of Paradise', price: 34.99,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',
  },
  {
    id: 3, category: 'Tropical', name: 'Philodendron Brasil', price: 18.99,
    image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80',
  },
  // Succulents & Cacti
  {
    id: 4, category: 'Succulents & Cacti', name: 'Echeveria Elegans', price: 9.99,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
  },
  {
    id: 5, category: 'Succulents & Cacti', name: 'Golden Barrel Cactus', price: 14.99,
    image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&q=80',
  },
  {
    id: 6, category: 'Succulents & Cacti', name: 'Aloe Vera', price: 12.99,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
  },
  // Air Purifiers
  {
    id: 7, category: 'Air Purifiers', name: 'Peace Lily', price: 19.99,
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&q=80',
  },
  {
    id: 8, category: 'Air Purifiers', name: 'Snake Plant', price: 21.99,
    image: 'https://images.unsplash.com/photo-1572688484438-313a6a50be7b?w=400&q=80',
  },
  {
    id: 9, category: 'Air Purifiers', name: 'Pothos Golden', price: 11.99,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80',
  },
  // Ferns & Foliage
  {
    id: 10, category: 'Ferns & Foliage', name: 'Boston Fern', price: 16.99,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&q=80',
  },
  {
    id: 11, category: 'Ferns & Foliage', name: 'Fiddle Leaf Fig', price: 39.99,
    image: 'https://images.unsplash.com/photo-1597055181449-5c28e8cefba4?w=400&q=80',
  },
  {
    id: 12, category: 'Ferns & Foliage', name: 'Calathea Orbifolia', price: 27.99,
    image: 'https://images.unsplash.com/photo-1614594576697-e1d31f16f3d5?w=400&q=80',
  },
];

const categories = [...new Set(plants.map(p => p.category))];

const categoryIcons = {
  'Tropical': '🌴',
  'Succulents & Cacti': '🌵',
  'Air Purifiers': '💨',
  'Ferns & Foliage': '🌿',
};

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedIds, setAddedIds] = useState(new Set(cartItems.map(i => i.id)));

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => new Set([...prev, plant.id]));
  };

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-hero">
        <h2>Our Plant Collection</h2>
        <p>Handpicked to bring life to every corner of your home</p>
      </div>
      <div className="product-container">
        {categories.map(cat => (
          <div className="category-section" key={cat}>
            <h2 className="category-title">
              {categoryIcons[cat] || '🌱'} {cat}
            </h2>
            <div className="plant-grid">
              {plants.filter(p => p.category === cat).map(plant => (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p className="price">${plant.price.toFixed(2)}</p>
                    <button
                      className="btn-add"
                      disabled={addedIds.has(plant.id)}
                      onClick={() => handleAdd(plant)}
                    >
                      {addedIds.has(plant.id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
