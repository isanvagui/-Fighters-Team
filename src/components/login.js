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
      // Manejar la respuesta de la API después del inicio de sesión exitoso
      console.log('Token de acceso:', response.data);
      // Redirigir a la página de inicio o hacer otras acciones necesarias después del inicio de sesión
      navigate('/productList');
    } catch (error) {
      // Manejar el error en caso de que falle el inicio de sesión
      console.error('Error de inicio de sesión:', error.response.data.message);
      setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="login-container"> {/* Clase CSS para contenedor principal */}
      <h2>Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>} {/* Clase CSS para mensaje de error */}
      <form onSubmit={handleSubmit}>
        <div className="input-group"> {/* Clase CSS para grupo de entrada */}
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group"> {/* Clase CSS para grupo de entrada */}
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button> {/* Clase CSS para botón de inicio de sesión */}
      </form>
    </div>
  );
}

export default Login;
