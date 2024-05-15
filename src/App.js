import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetPosts from './GetPosts';
import Bookings from './Bookings';
import GetProducts from './GetProducts';
import AddFormData from './AddFormData';
import NavBar from './NavBar';
import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<GetPosts />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/getproducts" element={<GetProducts />} />
          <Route path="/addFormData" element={<AddFormData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
