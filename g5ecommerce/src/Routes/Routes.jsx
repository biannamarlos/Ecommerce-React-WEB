import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { NotFoundPage } from "../pages/notFound/notFound";
import Cart from "../pages/cart/cart";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
