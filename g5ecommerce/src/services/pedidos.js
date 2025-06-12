import { apiPedidos } from "./api"

export function getPedidos() {
    return apiPedidos.get("/pedidos")
}

export function criarPedido(pedido) {
    return apiPedidos.post("/pedidos", pedido)
}

export function atualizarPedido(pedido) {
    return apiPedidos.put("/pedidos/{id}", pedido)
}

export function excluirPedido(pedido) {
    return apiPedidos.delete("/pedidos/{id}", pedido)
}