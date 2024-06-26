import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/security/login', {
        email,
        password
      });
      console.log('Token de acceso:', response.data);

      localStorage.setItem('accessToken', response.data.token[1]);
      localStorage.setItem('userInfo', response.data.token[0]);
      navigate('/productList');
    } catch (error) {
      console.error('Error de inicio de sesión:', error.response.data.message);
      setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  const navigateToLogin = () => {
    navigate('/');
};

  return (
  <div>
    <div className="navbar">
      <center>
        <h2>Acceder</h2>
      </center>
      <div className="navbar-buttons">
          <button onClick={navigateToLogin}>Volver</button>
      </div>
    </div>
    <br></br>
      <div className="login-container"> 
        <center>
          <h2>Iniciar Sesión</h2>
        </center>
        {error && <div className="error-message">{error}</div>} 
        <form onSubmit={handleSubmit}>
          <div className="input-group"> 
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group"> 
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button> 
        </form>
      </div>
    </div>
  );
}

export default Login;
