import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home"
import { Register } from "../pages/register/register";

import Cart from "../pages/cart/cart";

import { Login } from "../Login/login";


export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/cadastrar" element={<Register/>}/>

      <Route path="/carrinho" element={<Cart />}/>

      <Route path="/login" element={<Login/>}/>

    </Routes>
  );
}
//corrigir depois