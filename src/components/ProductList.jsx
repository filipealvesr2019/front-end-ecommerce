import React from 'react';

export default function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - Tamanho: {product.size}
        </li>
      ))}
    </ul>
  );
}
