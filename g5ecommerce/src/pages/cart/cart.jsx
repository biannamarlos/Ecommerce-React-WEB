import { useEffect, useState } from "react";

import styles from "./cart.module.css";
import { getCarrinho } from "../../services/carrinho";
import { apiPP, apiUC } from "../../services/api";
import axios from "axios";

export function Cart() {
  localStorage.setItem("usuario", 33); // Definindo um usuário fixo para testes
  const [usuarioId, setUsuarioId] = useState(() => localStorage.getItem("usuario"));
  const [cartList, setCartList] = useState([]);
  const [PodutosList, setPodutosList] = useState([]);
  const [produto, setProduto] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalPrice = useMemo(
    () => cartList.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0),
    [cartList]
  );

  function carregarUsuario(UsuarioId) {
    setLoading(true);
    console.log("Carregando usuário com ID:", usuarioId);
    apiUC
      .get("/usuarios?id=" + usuarioId)
      .then((response) => {
        const userData = response.data[0]; // Supondo que seja um único usuário
        setUsuario([
          {
            id: userData.id,
            nome: userData.nome,
            email: userData.email,
            telefone: userData.telefone,
            endRua: userData.endRua,
            endNum: userData.endNum,
            endBairro: userData.endBairro,
            endCidade: userData.endCidade,
            endUF: userData.endUF,
          },
        ]);
      })
      .catch((error) => {
        console.log("Erro ao carregar usuário:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function carregarCarrinho(usuarioId) {
    console.log("Carregando Carrinho");
    setLoading(true);

    apiUC
      .get("/carrinho?usuario=" + usuarioId)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCartList(response.data);
          let idProduto = response.data.map((item) => item.produto);
          idProduto.forEach((produtoId) => {
            try {
              carregarProdutos(produtoId);
            } catch (error) {
              console.log("Erro ao carregar produto:", error);
            }
          });
        } else {
          console.log("Nenhum item encontrado no carrinho.");
        }
      })
      .catch((error) => {
        console.log("Erro ao carregar carrinho:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log("Carrinho", cartList);

  const adicionarProduto = (produto) => {
    const novosProdutos = [...PodutosList, produto];
    setPodutosList(novosProdutos);
  };
  console.log(PodutosList);

  function carregarProdutos(idProduto) {
    setLoading(true);
    console.log("/Produto?id=" + idProduto);
    apiPP
      //  /Produto?id=1
      .get("/Produto?id=" + idProduto)
      .then((response) => {
        setProduto(response.data);
        adicionarProduto(response.data);
        alert(`Produto ${item.nome} carregado com sucesso!`);
        console.log("Produto carregado com sucesso", produto);
        console.log("ID do Produto", idProduto);
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("Carregando Produto");
  }

  // //UPDATE
  // const updateProduct = () => {
  //   //instanciando a requisição, depois da url base passar o endpoint e o requestBody
  //   api
  //     .put("/products", newProduct)
  //     .then((response) => {
  //       //tratativa caso a requisição for bem sucedida
  //       response.status === 200 ? console.log("deu certo") : "";
  //     })
  //     .catch((error) => {
  //       //tratativa caso a requisição não for bem sucedida
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    carregarUsuario(usuarioId);
    carregarCarrinho(usuarioId);
  }, []);
  // let nomeusuario = localStorage.getItem("Musuario");

  return (
    <div className={styles.container}>
      <p>Cliente: {usuario[0].nome}</p>
      <p>Email: {usuario[0].email}</p>
      <p>Telefone: {usuario[0].telefone}</p>
      <h3> ** Carrinho de Compras **</h3>
      <div className={styles.cardList}>
        {cartList.map((produto, id) => (
          <div key={id}>
            {id + 1} - {produto.produto}
            {/* <b>{<produto.produto.getItem.nome}</b> */}
            <p>{produto.produto.descricao}</p>
            <b>R$ {produto.produto.preco}</b> <br />
            <b>Quantidade:</b> {produto.quantidade}
            {/* <button onClick={() => updateProduct()}>Atualizar</button> */}
            {<button> + </button>}
            {<button> - </button>}
            {/* {<button onClick={() => deleteProduct(produto.id)}>Deletar</button>} */}
            {/* <button onClick={() => getAllProducts()}>Listar</button> */}
            {/* <button onClick={() => setProduto(product.id)}>Editar</button> */}
            {/* <img src={product.foto} alt="" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;
