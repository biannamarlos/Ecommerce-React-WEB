import { apiProdutos } from "./api"

export function listarProdutos() {
    return apiProdutos.get("/Produto")
}

export function criarProduto(produto) {
    return apiProdutos.post("/Produto", produto)
}

export function atualizarProduto(produto) {
    return apiProdutos.put("/Produto/{id}", produto)
}

export function excluirProduto(produto) {
    return apiProdutos.delete("/Produto/{id}", produto)
}