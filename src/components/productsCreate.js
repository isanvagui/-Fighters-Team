import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductsCreateQualification() {
    const [latestProduct, setLatestProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLatestProduct();
    }, []);

    const fetchLatestProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/product/buscar', {
                params: {
                    orderBy: '-createdAt',
                    limit: 5
                }
            });
            const products = response.data;
            const sortedProducts = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const latestProduct = sortedProducts.slice(0, 5);
            setLatestProducts(latestProduct);
        } catch (error) {
            console.error('Error al obtener el último producto:', error);
        }
    };

    const navigateToCreate = () => {
        navigate('/productList');
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <span className="navbar-brand">Últimos Productos Publicados</span>
                    <button className="btn btn-outline-light" onClick={navigateToCreate}>Volver</button>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    {latestProduct && latestProduct.map((product, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 text-center">
                                <div className="card-header">
                                    <h5 className="card-title">{product.name}</h5>
                                </div>
                                <img src={product.url} className="img-fluid card-img-top" alt={product.name} />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <p className="card-text">Descripción: {product.description}</p>
                                    <p className="card-text">Etiquetas: {product.tags.join(', ')}</p>
                                    <p className="card-text">Calificación: {product.rateAverage}</p>
                                    <p className="card-text">Fecha: {new Date(product.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsCreateQualification;
