import { apiUsuarios } from "./api"

export function getUsuarios() {
    return apiUsuarios.get("/usuarios")
}

export function criarUsuario(usuario) {
    return apiUsuarios.post("/usuarios", usuario)
}

export function atualizarUsuario(usuario) {
    return apiUsuarios.put("/usuarios/{id}", usuario)
}

export function excluirUsuario(usuario) {
    return apiUsuarios.delete("/usuarios/{id}", usuario)
}