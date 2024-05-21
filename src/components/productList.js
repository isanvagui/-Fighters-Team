import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/product/buscar');
      let updatedProducts = response.data;

      for (let product of updatedProducts) {
        const commentsResponse = await axios.get(`http://localhost:3001/api/v1/product/getComments/${product._id}`);
        product.comments = commentsResponse.data;
      }
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchProducts();
    } else {
      filtrar(value);
    }
  };

  const filtrar = searchTerm => {
    const term = searchTerm.toLowerCase();
    const resultadoBusqueda = products.filter(elemento => {
      return (
        (elemento.name && elemento.name.toLowerCase().includes(term)) ||
        (elemento.description && elemento.description.toLowerCase().includes(term)) ||
        (elemento.rateAverage && elemento.rateAverage.toString().toLowerCase().includes(term)) ||
        (elemento.tags && elemento.tags.some(tag => tag.toLowerCase().includes(term))) ||
        (elemento.username && elemento.username.toString().toLowerCase().includes(term))||
        (elemento.comments && elemento.comments.some(comment => comment.content.toLowerCase().includes(term)))||
        (elemento.createdAt && new Date(elemento.createdAt).toLocaleDateString().toLowerCase().includes(term))
      );
    });
    setProducts(resultadoBusqueda);
  };

  const navigateToProductProfile = id => {
    navigate(`/productProfile/${id}`);
  };

  const handleLogout = () => {
    // Elimina la información de la sesión
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    // Redirigir a la página de login
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Lista de Productos</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/productsCreate')}>Ultimos publicados</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/productQualification')}>Mejores productos</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/productForm')}>Crear producto</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/profilesUsers')}>Usuarios</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => navigate('/userProfile')}>Perfil usuario</button>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Buscar productos..." aria-label="Buscar" value={searchTerm} onChange={handleSearchChange} />
              <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Cerrar sesión</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map(product => (
            <div key={product._id} className="col">
              <div className="card h-100 text-center">
                <div className="card-header">
                  <h5 className="card-title" onClick={() => navigateToProductProfile(product._id)} style={{ cursor: 'pointer' }}>
                    {product.name}
                  </h5>
                </div>
                <img src={product.url} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '200px' }} />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">Descripción: {product.description}</p>
                  <p className="card-text">Etiquetas: {product.tags.join(', ')}</p>
                  <p className="card-text">Calificación promedio: {product.rateAverage}</p>
                  <p className="card-text">Usuario: {product.username}</p>
                  <div className="mt-auto w-100">
                    {product.comments.map(comment => (
                      <p key={comment._id} className="card-text">Comentario: {comment.content}</p>
                    ))}
                  </div>
                  <p className="card-text">Fecha de creación: {new Date(product.createdAt).toLocaleDateString()}</p>
                  <a href="https://www.rocotorestaurante.com/pedidos/" className="btn btn-dark mt-auto" target="_blank" rel="noopener noreferrer">
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
