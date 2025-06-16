import axios from 'axios';

export const apiPedidos = axios.create({
  baseURL: 'https://684ae5aa165d05c5d35ac2a5.mockapi.io/api'
})

export const apiProdutos = axios.create({
  baseURL: 'https://684ae5aa165d05c5d35ac2a5.mockapi.io/api'
})

export const apiUsuarios = axios.create({
  baseURL: 'https://681c9922f74de1d219ad056c.mockapi.io/api'
})

export const apiCarrinho = axios.create({
  baseURL: 'https://681c9922f74de1d219ad056c.mockapi.io/api'
})

export const apiPedido = axios.create({
  baseURL: 'https://6850500be7c42cfd1798385d.mockapi.io/api'
})