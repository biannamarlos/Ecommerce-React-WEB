import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Home from './pages/home';

export function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </Router>
  );
}

