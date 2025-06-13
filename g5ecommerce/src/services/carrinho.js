import { apiUC } from "./api";

export function getCarrinho() {
  return apiUC.get("/carrinho?usuario=" + String(localStorage.getItem("usuario")))
}

// export function criarCarrinho(carrinho) {
//   return apiCarrinho.post("/carrinho", carrinho)
// }

// export function atualizarCarrinho(carrinho) {
//   return apiCarrinho.put("/carrinho/{id}", carrinho)
// }

// export function excluirCarrinho(carrinho) {
//   return apiCarrinho.delete("/carrinho/{id}", carrinho)
