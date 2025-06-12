import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/register/register";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/cadastrar" element={<Register/>}/>
    </Routes>
  );
}
//corrigir depois