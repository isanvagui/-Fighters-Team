import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(token);
      fetchFollowedUsers(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/security/profile/${token}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('userId', response.data.userId);
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      navigate('/login');
    }
  };

  const fetchFollowedUsers = async (token) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/security/followedUsers/${token}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFollowedUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios seguidos:', error);
      navigate('/login');
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
      <div className="container">
        <div className="card text-center mb-4" style={{ width: 'auto' }}>
          <div className="card-header">
            <h5 className="card-title">{user.username}</h5>
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
            <div className="mt-auto w-100"></div>
          </div>
        </div>
        <h3>Usuarios Seguidos</h3>
        <div className="row">
          {followedUsers.map((followedUser) => (
            <div key={followedUser._id} className="col-md-4 mb-4">
              <div className="card text-center">
                <div className="card-header">
                  <h5 className="card-title">{followedUser.username}</h5>
                </div>
                <img
                  src={followedUser.avatar}
                  className="img-fluid card-img-top mx-auto"
                  alt={followedUser.username}
                  style={{ height: 'auto', maxWidth: '100%' }}
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">Correo electrónico: {followedUser.email}</p>
                  <p className="card-text">Biografía: {followedUser.bio}</p>
                  <div className="mt-auto w-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
