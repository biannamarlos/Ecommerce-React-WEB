import axios from 'axios';

// Criar uma instância do axios com a URL base da API para cada API que você deseja consumir

// API Produto e Pedido
export const apiPP = axios.create({
  baseURL: 'https://684ae5aa165d05c5d35ac2a5.mockapi.io/api'
})

// API Usuário e Carrinho
export const apiUC = axios.create({
  baseURL: 'https://681c9922f74de1d219ad056c.mockapi.io/api'
})



//caso esteja consumindo uma api local
// export const localApi = axios.create({
//     baseURL : 'http://localhost:8080'
// })