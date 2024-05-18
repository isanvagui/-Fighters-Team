// ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductForm () {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/product', {
        name,
        description,
        url,
        tags: tags.split(','), 
        username
      });
      console.log('Producto creado:', response.data);
    } catch (error) {
      console.error('Error al crear el producto:', error.response.data.message);
    }
  };

  const navigateToForm = () => {
    navigate('/productList');
};

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Crear producto</a>
          <button className="btn btn-outline-light" onClick={navigateToForm}>Volver</button>
        </div>
      </nav>
      <br></br>
      <div className="product-form-container">
        <center>
          <h2>Detalles del producto</h2>
        </center>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>URL:</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Etiqueta:</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nombre Usuario:</label>
            <textarea value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Crear Producto</button>
        </form>
      </div>
    </div>      
  );
  }

export default ProductForm;
