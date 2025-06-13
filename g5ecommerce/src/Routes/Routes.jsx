import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home"
import { Register } from "../pages/register/register";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/cadastrar" element={<Register/>}/>
    </Routes>
  );
}
//corrigir depois