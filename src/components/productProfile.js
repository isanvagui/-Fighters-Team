import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductProfile() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/product/getDetail/${id}?fields=name,url,description,tags,rateAverage,username`);
        const commentsResponse = await axios.get(`http://localhost:3001/api/v1/product/getComments/${id}`);
        const productData = { ...response.data, comments: commentsResponse.data };
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/review/new/', {
        productId: id,
        userId: localStorage.getItem('userId'),
        rate: parseInt(rate),
        content
      });
      const commentsResponse = await axios.get(`http://localhost:3001/api/v1/product/getComments/${id}`);
      setProduct(prevProduct => ({
        ...prevProduct,
        comments: commentsResponse.data
      }));
      setContent('');
      setRate('');
    } catch (error) {
      console.error('Error al agregar la reseña:', error.response.data.message);
    }
  };

  const navigateToProductProfila = () => {
    navigate('/productList');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">Perfil del Producto</span>
          <button className="btn btn-outline-light" onClick={navigateToProductProfila}>Volver</button>
        </div>
      </nav>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4 mb-0">
            <div className="card h-100">
              <div className="card-img-top-container">
                <img src={product.url} className="img-fluid card-img-top" alt={product.name} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">Descripción: {product.description}</p>
                <p className="card-text">Etiquetas: {product.tags.join(', ')}</p>
                <p className="card-text">Calificación promedio: {product.rateAverage}</p>
                <p className="card-text">Usuario: {product.username}</p>
                <div className="mt-3">
                  {product.comments.map(comment => (
                    <p key={comment._id} className="card-text">Comentario: {comment.content}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Agregar Comentario y Reseña</h3>
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="content">Comentario:</label>
                <textarea
                  id="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="rate">Reseña:</label>
                <input
                  type="number"
                  id="rate"
                  className="form-control"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Enviar</button> {/* Botón con color negro */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductProfile;
