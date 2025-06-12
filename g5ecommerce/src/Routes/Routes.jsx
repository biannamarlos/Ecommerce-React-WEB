import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/homepage/home";
import { FormPage } from "../pages/form/form";
import { About } from "../pages/about/about";
import { NotFoundPage } from "../pages/notFound/not-found";
import { Products } from "../pages/products/products";
import { Register } from "../pages/register/register";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/formulario" element={<FormPage />} />
      <Route path="/cadastrar" element={<Register/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
