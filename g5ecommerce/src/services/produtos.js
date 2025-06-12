import { apiProdutos } from "./api"

export function listarProdutos() {
    return apiProdutos.get("/Produto")
}

export async function listarCategoriasUnicas() {
    const response = await listarProdutos();
    const produtos = response.data;
    const categorias = [...new Set(produtos.map(p => p.categoria).filter(Boolean))];
    return categorias;
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