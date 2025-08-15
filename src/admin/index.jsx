import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from './AdminApp';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminApp />
  </BrowserRouter>
);