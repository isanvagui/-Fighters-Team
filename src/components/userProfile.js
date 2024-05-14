import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    const [users, setUser] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate(); // Obtener la función navigate para redireccionar a otras vistas
  
    useEffect(() => {
      // Obtener todos los productos
      fetchUser();
  
    }, []);
  
    const fetchUser = async () => {
      
        await axios.get('http://localhost:3001/api/v1/security/profile')
        .then(response => {
          console.log(response.data)
          setUser(response.data);
        }).catch(error => {
          console.log(error);
      })
    };
  
    // const navigateToCreateQualification = () => {
    //   // Navegar a otra vista cuando se hace clic en el botón
    //   navigate('/productsCreateQualification');
    //   // console.log(navigateToAnotherView)
    // };
  
    // const navigateToForm = () => {
    //   // Navegar a otra vista cuando se hace clic en el botón
    //   navigate('/productForm');
    //   // console.log(navigateToAnotherView)
    // };
  
    return (
  
      <div className="all-products">
        <h1>Perfil usuario</h1>
        {/* <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar productos..." /> */}
        {/* <button type="submit">Buscar</button> */}
        <h2></h2>
        <div className="product-grid">
          {users.map(users => (
            <div key={users._id} className="product-card">
              <h3>{users.username}</h3>
              <img src={users.avatar}/>
              <p>correo: {users.email}</p>
              <p>Bigrafia: {users.bio}</p>
              {/* <a href="https://www.rocotorestaurante.com/pedidos/">
                <button onClick={handleComprarClick}>Comprar</button>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default UserProfile;

