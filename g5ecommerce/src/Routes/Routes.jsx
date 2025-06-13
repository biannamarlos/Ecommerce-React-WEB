import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home"
import { Register } from "../pages/register/register";
import { Login } from "../Login/login";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/cadastrar" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}
//corrigir depois