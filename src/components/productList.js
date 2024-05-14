import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate desde react-router-dom

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Obtener la función navigate para redireccionar a otras vistas

  useEffect(() => {
    // Obtener todos los productos
    fetchProducts();

  }, []);

  const fetchProducts = async () => {
    
      await axios.get('http://localhost:3001/api/v1/product/buscar')
      .then(response => {
        console.log(response.data)
        setProducts(response.data);
      }).catch(error => {
        console.log(error);
    })
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    filtrar(event.target.value);
  };

  const filtrar = (searchTerm) => {
    const term = searchTerm.toLowerCase(); // Convertir searchTerm a minúsculas para la comparación insensible a mayúsculas y minúsculas
    const resultadoBusqueda = products.filter((elemento) => {
      // Verificar si el nombre, la descripción, la tasa promedio o algún tag coincide con el searchTerm
      return (
        (elemento.name && elemento.name.toLowerCase().includes(term)) ||
        (elemento.description && elemento.description.toLowerCase().includes(term)) ||
        (elemento.rateAverage && elemento.rateAverage.toString().toLowerCase().includes(term)) ||
        (elemento.tags && elemento.tags.some(tag => tag.toLowerCase().includes(term))) ||
        (elemento.username && elemento.username.toString().toLowerCase().includes(term))
      );
    });
    setProducts(resultadoBusqueda);
  }

  const navigateToCreateQualification = () => {
    // Navegar a otra vista cuando se hace clic en el botón
    navigate('/productsCreateQualification');
    // console.log(navigateToAnotherView)
  };

  const navigateToForm = () => {
    // Navegar a otra vista cuando se hace clic en el botón
    navigate('/userProfile');
    // console.log(navigateToAnotherView)
  };

  const handleComprarClick = () => {
    // Redireccionar al usuario al enlace externo al hacer clic en la imagen
    window.location.href = 'https://www.rocotorestaurante.com/pedidos/';
  };

  return (

    <div className="all-products">
      <h1>Lista de Productos</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar productos..." />
      <button type="submit">Buscar</button>
      <h2></h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <img src={product.url}/>
            <p>Descripción: {product.description}</p>
            <p>Etiquetas: {product.tags.join(', ')}</p>
            <p>Calificación: {product.rateAverage}</p>
            <p>Usuario: {product.username}</p>
            <a href="https://www.rocotorestaurante.com/pedidos/">
              <button onClick={handleComprarClick}>Comprar</button>
            </a>
          </div>
        ))}
      </div>
      {/* Botón para redirigir a otra vista */}
      <button onClick={navigateToCreateQualification}>Calificación y ultimo registrado</button>
      <h2></h2>
      <button onClick={navigateToForm}>Publicar producto</button>
    </div>
  );
}

export default ProductList;
