// ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';

function ProductForm () {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [rateAverage, setRateAverage] = useState('');
  const [userId, setUserId] = useState(''); // Aquí deberías obtener el ID del usuario autenticado
  const [username, setUsername] = useState(''); // Aquí deberías obtener el nombre del usuario autenticado

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/product', {
        name,
        description,
        url,
        tags: tags.split(','), // Convertir las etiquetas a un array
        rateAverage,
        userId,
        username
      });
      console.log('Producto creado:', response.data);
      // Realizar alguna acción adicional si es necesario, como redirigir a la lista de productos
    } catch (error) {
      console.error('Error al crear el producto:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <label>Etiquetas (separadas por comas):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div>
        <label>idUsuario:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Calificación:</label>
        <input type="text" value={rateAverage} onChange={(e) => setRateAverage(e.target.value)} />
      </div>
      <div>
        <label>Nombre Usuario:</label>
        <textarea value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <button type="submit">Crear Producto</button>
    </form>
  );
}

export default ProductForm;
