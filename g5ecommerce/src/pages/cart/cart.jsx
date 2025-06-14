import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import styles from "./cart.module.css";
import { apiProdutos, apiUsuarios, apiCarrinho } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  // Definição do usuário fixo para testes

  const [usuarioId] = useState(() => localStorage.getItem("usuario"));
  const [cartList, setCartList] = useState([]);
  const [produtosList, setProdutosList] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("usuario", "33"); // Provisório para testes, deve ser removido em produção
    if (usuarioId) {
      carregarUsuario(usuarioId);
      carregarCarrinho(usuarioId);
    }
  }, [usuarioId]);

  function carregarUsuario(usuarioId) {
    setLoading(true);
    console.log("Carregando usuário com ID:", usuarioId);
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
    console.log("Carregando Carrinho");

    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setCartList(data);
          data.forEach(({ produto }) => carregarProdutos(produto));
        } else {
          console.warn("Nenhum item encontrado no carrinho.");
          navigate("/");
        }
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  }

  function carregarProdutos(idProduto) {
    setLoading(true);
    console.log(`Carregando Produto com ID: ${idProduto}`);

    apiProdutos
      .get(`/Produto?id=${idProduto}`)
      .then(({ data }) => {
        setProdutosList((prev) => [...prev, data]);
        console.log("Produto carregado:", data);
      })
      .catch((error) => console.error("Erro ao carregar produto:", error))
      .finally(() => setLoading(false));
  }

  const totalValor = cartList.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  return (
    <div className={styles.container}>
      <div className={styles.cardCliente}>
        {/* Verificação antes de acessar propriedades do objeto */}
        {usuario.nome && (
          <>
            <p className={styles.clienteNome}>{usuario.nome}</p>
            <p className={styles.clienteInfo}>Email: {usuario.email}</p>
            <p className={styles.clienteContato}>Telefone: {usuario.telefone}</p>
          </>
        )}
      </div>

      <h3>🛒 ** Carrinho de Compras **</h3>
      <div className={styles.cartList}>
        {cartList.map((item, id) => (
          <div key={id} className={styles.cartItem}>
            {/* Ajuste na fonte da imagem do produto */}
            <img src={item.foto} alt={item.nome} className={styles.produtoImagem} />
            <div className={styles.produtoDetalhes}>
              <p>
                <strong>{item.produto.nome}</strong>
              </p>
              <p>{item.produto.descricao}</p>
              <p>{/* <strong>Preço unitário:</strong> R$ {item.produto.preco.toFixed(2)} */}</p>
              <p>
                <strong>Quantidade:</strong> {item.quantidade}
              </p>
              <p>
                <strong>Total:</strong> R$ {(item.produto.preco * item.quantidade).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <h3>🛍️ Total Geral: R$ {totalValor.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
