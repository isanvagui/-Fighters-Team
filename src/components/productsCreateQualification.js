import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function ProductsCreateQualification () {
    const [topRatedProducts, setTopRatedProducts] = useState(null);
    const [latestProduct, setLatestProducts] = useState(null);

useEffect(() => {
    // Obtener el producto mejor calificado
    fetchTopRatedProducts();
    // Obtener el último producto publicado
    fetchLatestProduct();
    }, []);

    const fetchTopRatedProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/product/buscar', {
        params: {
            // name: searchTerm,
            orderBy: 'rateAverage', // Ordenar por la tasa promedio
            limit: 5 // Obtener los cinco mejores productos
        }
        });
        // Obtener la lista de productos de la respuesta
        const products = response.data;
        // Ordenar los productos por tasa promedio en orden descendente
        const sortedProducts = products.sort((a, b) => b.rateAverage - a.rateAverage);
        // Obtener los cinco mejores productos (los primeros cinco después de ordenar)
        const topRatedProducts = sortedProducts.slice(0, 5);
        setTopRatedProducts(topRatedProducts);
    } catch (error) {
        console.error('Error al obtener los mejores productos:', error);
    }
    };

    const fetchLatestProduct = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/product/buscar', {
        params: {
            // name: searchTerm, // Enviar el término de búsqueda al backend
            orderBy: '-createdAt',
            limit: 5 // Ordenar por createdAt en orden descendente
        }});

        // Obtener la lista de productos de la respuesta
        const products = response.data;
        // Ordenar los productos por orden de ingreso descendente
        const sortedProducts = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // console.log(sortedProducts)
        // Obtener los ultimos cinco ingresados
        const latestProduct = sortedProducts.slice(0, 5);
        console.log(latestProduct)
        setLatestProducts(latestProduct);
    } catch (error) {
        console.error('Error al obtener el último producto:', error);
    }
    };

    return (
    <div className="all-products">
        <h2></h2>
        <h2>Mejores Productos Calificados</h2>
        <div className="product-grid">
            {topRatedProducts && topRatedProducts.map((product, index) => (
            <div key={index} className="product-card">
                <h3>{product.name}</h3>
                <img src={product.url} alt={product.name} />
                <p>Descripción: {product.description}</p>
                <p>Etiquetas: {product.tags.join(', ')}</p>
                <p>Calificación: {product.rateAverage}</p>
            </div>
            ))}
        </div>
            
        <h2></h2>
        <h2>Últimos Productos Publicados</h2>
        <div className="product-grid">
            {latestProduct && latestProduct.map((product, index) => (
            <div key={index} className="product-card">
                <h3>{product.name}</h3>
                <img src={product.url} alt={product.name} />
                <p>Descripción: {product.description}</p>
                <p>Etiquetas: {product.tags.join(', ')}</p>
                <p>Calificación: {product.rateAverage}</p>
                <p>fecha: {product.createdAt}</p>
            </div>
            ))}
        </div>
        <button><Link to="/productList">Pagina principal</Link></button>
    </div>
    );
}

export default ProductsCreateQualification;
  