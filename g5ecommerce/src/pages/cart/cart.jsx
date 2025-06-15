import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import styles from "./cart.module.css";
import { apiProdutos, apiUsuarios, apiCarrinho } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(() => localStorage.getItem("usuario"));
  const [cartList, setCartList] = useState([
    {
      id: 0,
      produto: 0,
      quantidade: 0,
      nome: "",
      descricao: "",
      foto: "",
      preco: 0.0,
      estoque: 0,
    },
  ]);
  const [produtosList, setProdutosList] = useState([
    {
      id: 0,
      nome: "",
      descricao: "",
      foto: "",
      preco: 0.0,
      estoque: 0,
      categoria: "",
    },
  ]);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarUsuario(usuarioId);
    carregarCarrinho(usuarioId);
  }, [usuarioId]);

  function carregarUsuario(usuarioId) {
    setLoading(true);
    apiUsuarios
      .get(`/usuarios?id=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setUsuario(data[0]);
        }
      })
      .catch((error) => console.error("Erro ao carregar usuário:", error))
      .finally(() => setLoading(false));
  }

  function carregarCarrinho(usuarioId) {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setCartList(data);
          for (let index = 0; index < data.length; index++) {
            //const element = data[index];
            alert(`Carregando produto ${index + 1} de ${data.length} - ${data[index].produto}`);
            carregarProdutos(index, data[index].produto);
            // const idsProdutos = data.map(({ produto }) => produto);
            // carregarProdutos(idsProdutos);
          }
        } else {
          console.warn("Nenhum item encontrado no carrinho.");
          navigate("/");
        }
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  }

  function carregarProdutos(idCarrinho, idProduto) {
    setLoading(true);
    alert(`Carregando produto ${idProduto} do carrinho ${idCarrinho} - dentro carregarProdutos()`);
    alert(`Carrinho: ${cartList}`);
    alert(`Produtos: ${produtosList}`);
    apiProdutos
      .get(`/Produtos?id=${idProduto}`)
      .then(({ data }) => {
        alert(data);
        if (data.length > 0) {
          alert(`Carregando produto ${idProduto} do carrinho ${idCarrinho} - dentro carregarProdutos`);
          setCartList((prevCartList) => {
            const newCartList = [...prevCartList];
            newCartList[idCarrinho] = {
              ...newCartList[idCarrinho],
              nome: data.nome,
              descricao: data.descricao,
              foto: data.foto,
              preco: data.preco,
              estoque: data.estoque,
              categoria: data.categoria,
            };
            return newCartList;
          });
        }
      })
      .catch((error) => console.error("Erro ao carregar usuário:", error))
      .finally(() => setLoading(false));
  }

  function atualizarCartList(produtos) {
    setCartList((prevCartList) =>
      prevCartList.map((item) => {
        const produtoEncontrado = produtos.find((p) => p.id === item.produto);
        return produtoEncontrado ? { ...item, ...produtoEncontrado } : item;
      })
    );
  }

  const totalValor = cartList.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className={styles.container}>
      <h3>🛒 Carrinho de Compras</h3>
      <div className={styles.cardCliente}>
        {usuario.nome && (
          <>
            <p className={styles.clienteNome}>{usuario.nome}</p>
            <p className={styles.clienteInfo}>Email: {usuario.email}</p>
            <p className={styles.clienteContato}>Telefone: {usuario.telefone}</p>
          </>
        )}
      </div>

      <div className={styles.cartList}>
        {cartList.map((item, id) => (
          <div key={id} className={styles.cartItem}>
            <img src={item.foto} alt={item.nome} className={styles.produtoImagem} />
            <div className={styles.produtoDetalhes}>
              <p>
                <strong>
                  {item.id} - {item.nomeProduto}
                </strong>
              </p>
              <p>{item.descricaoProduto}</p>
              <p>
                <strong>Preço unitário:</strong> R$ {item.preco}
              </p>
              <p>
                <strong>Quantidade:</strong> {item.quantidade}
              </p>
              <p>
                <strong>Total:</strong> R$ {item.preco * item.quantidade}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <h3>🛍️ Total Geral: R$ {totalValor}</h3>
      </div>
    </div>
  );
}

export default Cart;
