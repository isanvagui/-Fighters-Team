import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import ProductList from './components/productList';
import UserProfile from './components/userProfile';
import ProductProfile from './components/productProfile';
import ProductForm from './components/productForm';
import ProductQualification from './components/productQualification';
import ProductsCreate from './components/productsCreate';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/productProfile/:id" element={<ProductProfile />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/productQualification" element={<ProductQualification />} />
        <Route path="/productsCreate" element={<ProductsCreate />} />
      </Routes>
    </Router>
  );
}

export default App;


