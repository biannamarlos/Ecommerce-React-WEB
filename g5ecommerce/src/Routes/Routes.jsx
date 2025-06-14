import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home"
import { Register } from "../pages/register/register";
import Profile from "../pages/profile/profile";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/cadastrar" element={<Register/>}/>
      <Route path="/perfil" element={<Profile/>}/>
    </Routes>
  );
}
//corrigir depois