// src/pages/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import dummyProducts from '../dummyData';

function ProductDetail() {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <div className="info">
        <p>Company: {product.company}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p className="rating">Rating: {product.rating} ★</p>
        <p className="discount">Discount: {product.discount}% off</p>
        <p className={`availability ${product.availability ? '' : 'out-of-stock'}`}>
          Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
