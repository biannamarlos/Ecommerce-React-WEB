import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { apiUsuarios, apiCarrinho } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../utils/localstorage";

export function Cart() {
  const navigate = useNavigate();
  const [usuarioId] = useState(() => getUsuario());
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //usuarioId = 33;
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
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  }
  function incrementar(id) {
    setCartList((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        itens: item.itens.map((produto) =>
          produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
        ),
      }))
    );
  }

  function decrementar(id) {
    setCartList((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        itens: item.itens.map((produto) =>
          produto.id === id ? { ...produto, quantidade: Math.max(1, produto.quantidade - 1) } : produto
        ),
      }))
    );
  }

  function excluir(id) {
    setCartList((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        itens: item.itens.filter((produto) => produto.id !== id),
      }))
    );
  }
  const totalValor = cartList.reduce((acc, item) => {
    return acc + item.itens.reduce((subAcc, produto) => subAcc + parseFloat(produto.preco) * produto.quantidade, 0);
  }, 0);

  return (
    <div className={styles.container}>
      {/* <h3>🛒 Carrinho de Compras</h3> */}
      <div className={styles.total}>
        <h3>🛒 Carrinho de Compras - 🛍️ Total Geral: R$ {totalValor.toFixed(2)}</h3>
      </div>
      <div className={styles.cardCliente}>
        {usuario.nome && (
          <>
            <p className={styles.clienteNome}>{usuario.nome}</p>
            <p className={styles.clienteInfo}>Email: {usuario.email}</p>
            <p className={styles.clienteContato}>Telefone: {usuario.telefone}</p>
          </>
        )}
      </div>
      {/* Container com GRID */}
      <div className={styles.produtosGrid}>
        {cartList.map((item) =>
          item.itens.map((produto) => (
            <div key={produto.id} className={styles.produtoCard}>
              <img src={produto.foto} alt={produto.nome} className={styles.produtoImagem} />
              <p>
                <strong>
                  {produto.nome} Preço R$ {parseFloat(produto.preco).toFixed(2)}
                </strong>
              </p>
              <p>{produto.descricao}</p>

              {/* <p className={styles.quantidade}> */}
              <span> ´Quantidade: {produto.quantidade} `</span>
              <button onClick={() => decrementar(produto.id)}> ➖ </button>
              <button onClick={() => incrementar(produto.id)}> ➕ </button>
              <button onClick={() => excluir(produto.id)}> 🗑️ </button>
              {/* </p> */}
              <p>
                <strong>Total:</strong> R$ {parseFloat(produto.preco * produto.quantidade).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      <p></p>
      <button>Finalizar Compra</button>
      <p></p>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Cart;
