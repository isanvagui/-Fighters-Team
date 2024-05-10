import React from 'react';
import './App.css';
// import UserProfile from './components/UserProfile';
// import ProductForm from './components/ProductForm';
import ProductList from './components/productList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación</h1>
      </header>
      <main>
        {/* <UserProfile /> */}
        {/* <ProductForm /> */}
        <ProductList />
      </main>
    </div>
  );
}

export default App;

