import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import UserProfile from './components/userProfile';
import ProductList from './components/productList';
import ProductForm from './components/productForm';
import ProductsCreateQualification from './components/productsCreateQualification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/productsCreateQualification" element={<ProductsCreateQualification />} />
      </Routes>
    </Router>
  );
}

export default App;


