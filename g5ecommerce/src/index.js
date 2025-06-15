import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // <-- Aqui ele importa o App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* <-- Aqui ele mostra o conteúdo do App */}
  </React.StrictMode>
);