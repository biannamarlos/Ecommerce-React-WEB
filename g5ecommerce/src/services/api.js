import axios from 'axios';


// Criar uma instância do axios com a URL base da API para cada API que você deseja consumir


export const api = axios.create({
  baseURL: 'https://fakestoreapi.com/'
})

//caso esteja consumindo uma api local
// export const localApi = axios.create({
//     baseURL : 'http://localhost:8080'
// })