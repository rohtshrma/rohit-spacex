// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Rockets from '../pages/Rockets';


const AppRoutes = () => (
  <Router>
    <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/rockets" element={<Rockets />} />
     {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> 404 Route */}
    </Routes>
  </Router>
);

export default AppRoutes;
