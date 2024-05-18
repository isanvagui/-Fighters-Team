import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/security/profile/'+token, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      localStorage.setItem('userId', response.data.userId);
      console.log(response.data)
      setUser(response.data); 
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  const navigateToUserProfile = () => {
    navigate('/productList');
  };

  if (!user) {
    return <div>Cargando...</div>; 
  }

  return (
  <div>
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">Perfil de usuario</span>
        <button className="btn btn-outline-light" onClick={navigateToUserProfile}>Volver</button>
      </div>
    </nav>
    <div className="container d-flex justify-content-center">
        <div className="card text-center" style={{ width: 'auto' }}>
          <div className="card-header">
            <h5 className="card-title">
              {user.username}
            </h5>
          </div>
          <img 
            src={user.avatar} 
            className="img-fluid card-img-top mx-auto" 
            alt={user.username} 
            style={{ height: 'auto', maxWidth: '100%' }} 
          />
          <div className="card-body d-flex flex-column align-items-center">
            <p className="card-text">Correo electrónico: {user.email}</p>
            <p className="card-text">Biografía: {user.bio}</p>
            <div className="mt-auto w-100">
            </div>
          </div>
        </div>
      </div>
  </div>
);

}

export default UserProfile;

