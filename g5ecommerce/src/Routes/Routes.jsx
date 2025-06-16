import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { Register } from "../pages/register/register";
import About from "/src/pages/about/about.jsx";
import Profile from "../pages/profile/profile";
import Cart from "../pages/cart/cart";
import { Login } from "../pages/login/login";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
