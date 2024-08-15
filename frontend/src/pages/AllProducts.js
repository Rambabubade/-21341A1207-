// src/pages/AllProducts.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dummyProducts from '../dummyData';

function AllProducts() {
  const [products, setProducts] = useState(dummyProducts);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: [0, 1000],
    availability: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredProducts = products
    .filter(product => 
      (filters.category ? product.category === filters.category : true) &&
      (filters.company ? product.company === filters.company : true) &&
      (filters.rating ? product.rating >= parseFloat(filters.rating) : true) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      (filters.availability ? product.availability.toString() === filters.availability : true)
    );

  return (
    <div className="container">
      <h1>All Products</h1>
      <div className="filters">
        <select name="category" className="filter-select" onChange={handleFilterChange}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          {/* Add more options */}
        </select>
        <select name="company" className="filter-select" onChange={handleFilterChange}>
          <option value="">Select Company</option>
          <option value="Company A">Company A</option>
          <option value="Company B">Company B</option>
          <option value="Company C">Company C</option>
          {/* Add more options */}
        </select>
        <input 
          type="number" 
          name="rating" 
          placeholder="Min Rating" 
          onChange={handleFilterChange} 
        />
        <input 
          type="number" 
          name="priceRange" 
          placeholder="Min Price" 
          onChange={(e) => setFilters(prevFilters => ({ 
            ...prevFilters, 
            priceRange: [parseFloat(e.target.value), prevFilters.priceRange[1]] 
          }))} 
        />
        <input 
          type="number" 
          name="priceRange" 
          placeholder="Max Price" 
          onChange={(e) => setFilters(prevFilters => ({ 
            ...prevFilters, 
            priceRange: [prevFilters.priceRange[0], parseFloat(e.target.value)] 
          }))} 
        />
        <select name="availability" className="filter-select" onChange={handleFilterChange}>
          <option value="">Select Availability</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>
      <div className="grid">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.company}</p>
            <p>${product.price}</p>
            <p className="rating">{product.rating} ★</p>
            <p className="discount">{product.discount}% off</p>
            <p className={`availability ${product.availability ? '' : 'out-of-stock'}`}>
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
