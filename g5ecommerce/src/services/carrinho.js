import { apiCarrinho } from "./api"

export function getCarrinho() {
    return apiCarrinho.get("/carrinho")
}

export function criarCarrinho(carrinho) {
    return apiCarrinho.post("/carrinho", carrinho)
}

export function atualizarCarrinho(carrinho) {
    return apiCarrinho.put("/carrinho/{id}", carrinho)
}

export function excluirCarrinho(carrinho) {
    return apiCarrinho.delete("/carrinho/{id}", carrinho)
}