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

          // Criando uma lista única de produtos
          const novosProdutos = data.flatMap((item) => item.itens);
          setProductList(novosProdutos);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  }

  const totalValor = cartList.reduce((acc, item) => {
    return acc + item.itens.reduce((subAcc, produto) => subAcc + parseFloat(produto.preco) * produto.quantidade, 0);
  }, 0);

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

      {/* Container com GRID */}
      <div className={styles.produtosGrid}>
        {cartList.map((item) =>
          item.itens.map((produto) => (
            <div key={produto.id} className={styles.produtoCard}>
              <img src={produto.foto} alt={produto.nome} className={styles.produtoImagem} />
              <p>
                <strong>
                  {produto.id} - {produto.nome}
                </strong>
              </p>
              <p>{produto.descricao}</p>
              <p>
                <strong>Preço unitário:</strong> R$ {produto.preco}
              </p>
              <p>
                <strong>Quantidade:</strong> {produto.quantidade}
              </p>
              <p>
                <strong>Total:</strong> R$ {parseFloat(produto.preco) * produto.quantidade}
              </p>
            </div>
          ))
        )}
      </div>

      <div className={styles.total}>
        <h3>🛍️ Total Geral: R$ {totalValor.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
