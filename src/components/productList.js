import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [topRatedProduct, setTopRatedProduct] = useState(null);
  const [latestProduct, setLatestProduct] = useState(null);

  useEffect(() => {
    // Obtener todos los productos
    fetchProducts();
    // Obtener el producto mejor calificado
    fetchTopRatedProduct();
    // Obtener el último producto publicado
    fetchLatestProduct();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/product/buscar');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const fetchTopRatedProduct = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/product/buscar', {
        params: {
          orderBy: 'rateAverage', // Ordenar por la tasa promedio
          limit: 1 // Obtener solo el mejor producto
        }
      });
      setTopRatedProduct(response.data[0]);
    } catch (error) {
      console.error('Error al obtener el mejor producto:', error);
    }
  };

  const fetchLatestProduct = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/product/buscar', {
        params: {
          orderBy: 'createdAt', // Ordenar por la fecha de creación
          limit: 1 // Obtener solo el último producto
        }
      });
      setLatestProduct(response.data[0]);
    } catch (error) {
      console.error('Error al obtener el último producto:', error);
    }
  };

  return (
    <div className="product-suggestions">
      <div className="top-rated-product">
        <h2>Mejor Producto Calificado</h2>
        {topRatedProduct && (
          <div className="product-card">
            <h3>{topRatedProduct.name}</h3>
            <img src={topRatedProduct.url} alt={topRatedProduct.name} />
            <p>Descripción: {topRatedProduct.description}</p>
            <p>Tags: {topRatedProduct.tags.join(', ')}</p>
            <p>Tasa Promedio: {topRatedProduct.rateAverage}</p>
          </div>
        )}
      </div>
      <div className="latest-product">
        <h2>Último Producto Publicado</h2>
        {latestProduct && (
          <div className="product-card">
            <h3>{latestProduct.name}</h3>
            <img src={latestProduct.url} alt={latestProduct.name} />
            <p>Descripción: {latestProduct.description}</p>
            <p>Tags: {latestProduct.tags.join(', ')}</p>
            <p>Tasa Promedio: {latestProduct.rateAverage}</p>
          </div>
        )}
      </div>
      <div className="all-products">
        <h2>Todos los Productos</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <img src={product.url} alt={product.name} />
              <p>Descripción: {product.description}</p>
              <p>Tags: {product.tags.join(', ')}</p>
              <p>Tasa Promedio: {product.rateAverage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
