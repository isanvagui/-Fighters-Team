import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilesUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la lista de usuarios al cargar el componente
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Realizar la solicitud GET al endpoint para obtener la lista de usuarios
      const response = await axios.get('http://localhost:3001/api/v1/security/users');
      setUsers(response.data); // Establece los datos de los usuarios en el estado
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      navigate('/profilesUsers');
    }
  };

  const navigateToUserProfile = () => {
    // Navegar a otra vista cuando se hace clic en el botón
    navigate('/productList');
  };

  const followUser = async (userId) => {
    const loggedInUserId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/security/follow/${loggedInUserId}`, { userToFollowId: userId });
      toast.success('Usuario seguido exitosamente');
      // Actualizar la lista de usuarios después de seguir al usuario
      fetchUsers();
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
      toast.error('Error al seguir al usuario');
    }
  };

  const loggedInUserId = localStorage.getItem('userId');

  if (users.length === 0) {
    return <div>Cargando...</div>; 
  }

  return (
    <div>
      <ToastContainer />
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">Lista de Usuarios</span>
          <button className="btn btn-outline-light" onClick={navigateToUserProfile}>Volver</button>
        </div>
      </nav>
      <div className="container">
        <div className="row">
        {users.filter(user => user._id !== loggedInUserId).map((user) => (  
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <div className="card-header">
                  <h5 className="card-title">
                    {user.username}
                  </h5>
                </div>
                <img 
                  src={user.avatar} 
                  className="img-fluid card-img-top mx-auto" 
                  alt={user.username} 
                  style={{ objectFit: 'cover', height: '200px' }} 
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text">Correo electrónico: {user.email}</p>
                  <p className="card-text">Biografía: {user.bio}</p>
                  <button className="btn btn-dark mt-auto" onClick={() => followUser(user._id)}>Seguir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilesUsers;
