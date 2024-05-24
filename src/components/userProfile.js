import React, { useState, useEffect } from 'react';
import axios from 'axios'; //libreria de solicitudes
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followers, setFollowers] = useState([]); 
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
      const userId = user.userId;
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
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4 mb-0">
            <div className="card h-100">
              <div className="card-img-top-container">
                <img src={user.avatar} className="img-fluid card-img-top" alt={user.username} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-center">
                <h2 className="card-title">{user.username}</h2>
                <p className="card-text">Correo electrónico: {user.email}</p>
                <p className="card-text">Biografía: {user.bio}</p>
                <div className="mt-3"></div>
              </div>
            </div>
          </div>
        </div>  
      <div className="container mt-4">
        <center>
          <h3>Seguidos</h3>
        </center>
         <br></br> {/* para espacios */}
        <div className="row">
          {followedUsers.map(followedUser => (
            <div key={followedUser._id} className="col-md-4 mb-4">
              <div className="card card h-100 text-center">
                <div className="container d-flex justify-content-center">
                  <h5 className="card-title">{followedUser.username}</h5>
                </div>
                <img 
                  src={followedUser.avatar} 
                  className="img-fluid card-img-top mx-auto" 
                  alt={followedUser.username} 
                  style={{ objectFit: 'cover', height: '200px' }} 
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">{followedUser.email}</p>
                  <p className="card-text">{followedUser.bio}</p>
                  <button className="btn btn-danger" onClick={() => handleUnfollow(followedUser._id)}>Dejar de seguir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-4">
        <center>
          <h3>Seguidores</h3>
        </center>
        <br></br> {/* para espacios */}
        <div className="row">
          {followers.map(follower => (
            <div key={follower._id} className="col-md-4 mb-4">
              <div className="card card h-100 text-center">
                <div className="container d-flex justify-content-center">
                  <h5 className="card-title">{follower.username}</h5>
                </div>
                <img 
                  src={follower.avatar} 
                  className="img-fluid card-img-top mx-auto"  
                  alt={follower.username} 
                  style={{ objectFit: 'cover', height: '200px' }} 
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">{follower.email}</p>
                  <p className="card-text">{follower.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default UserProfile;
