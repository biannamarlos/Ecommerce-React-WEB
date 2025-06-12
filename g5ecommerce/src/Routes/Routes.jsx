import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { NotFoundPage } from "../pages/notFound/notFound";


export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
