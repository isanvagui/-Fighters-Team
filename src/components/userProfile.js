import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followers, setFollowers] = useState([]); // Nuevo estado para los seguidores
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
      fetchFollowers(response.data.userId); // Obtener los seguidores usando el userId
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
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
    }
  };

  const fetchFollowers = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/security/followers/${userId}`);
      setFollowers(response.data);
    } catch (error) {
      console.error('Error al obtener los seguidores:', error);
    }
  };

  const handleUnfollow = async (userToUnfollowId) => {
    try {
      const userId = user.userId; // ID del usuario autenticado
      await axios.post(`http://localhost:3001/api/v1/security/unfollow/${userId}`, {
        userToUnfollowId
      });
      setFollowedUsers(followedUsers.filter(user => user._id !== userToUnfollowId));
    } catch (error) {
      console.error('Error al dejar de seguir al usuario:', error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">Perfil de usuario</span>
          <button className="btn btn-outline-light" onClick={() => navigate('/productList')}>Volver</button>
        </div>
      </nav>
      <div className="container d-flex justify-content-center">
        <div className="card text-center" style={{ width: 'auto' }}>
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
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h3>Usuarios Seguidos</h3>
        <div className="row">
          {followedUsers.map(followedUser => (
            <div key={followedUser._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">{followedUser.username}</h5>
                </div>
                <img 
                  src={followedUser.avatar} 
                  className="card-img-top" 
                  alt={followedUser.username} 
                />
                <div className="card-body">
                  <p className="card-text">{followedUser.bio}</p>
                  <button className="btn btn-danger" onClick={() => handleUnfollow(followedUser._id)}>Dejar de seguir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-4">
        <h3>Seguidores</h3>
        <div className="row">
          {followers.map(follower => (
            <div key={follower._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">{follower.username}</h5>
                </div>
                <img 
                  src={follower.avatar} 
                  className="card-img-top" 
                  alt={follower.username} 
                />
                <div className="card-body">
                  <p className="card-text">{follower.bio}</p>
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
