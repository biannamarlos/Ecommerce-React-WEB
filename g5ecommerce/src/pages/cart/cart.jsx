import { useEffect, useState } from "react";
import { NavbarCart } from "../../components/navbarcart/navBarCart";
import styles from "./cart.module.css";
import { apiUsuarios, apiCarrinho, apiPedidos } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../utils/localstorage";
import jsPDF from "jspdf";

export function Cart() {
  const navigate = useNavigate();
  const [usuarioId] = useState(() => getUsuario());
  const [cartList, setCartList] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const [pedidoList, setPedidoList] = useState([]);

  useEffect(() => {
    if (usuarioId) {
      carregarUsuario(usuarioId);
      carregarCarrinho(usuarioId);
    }
  }, [usuarioId]);

  function carregarUsuario(id) {
    setLoading(true);
    apiUsuarios
      .get(`/usuarios?id=${id}`)
      .then(({ data }) => {
        if (data.length > 0) setUsuario(data[0]);
      })
      .catch((error) => console.error("Erro ao carregar usuário:", error))
      .finally(() => setLoading(false));
  }

  function carregarCarrinho(id) {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${id}`)
      .then(({ data }) => {
        setCartList(data.length > 0 ? data : []);
        if (data.length === 0) navigate("/");
      })
      .catch((error) => console.error("Erro ao carregar carrinho:", error))
      .finally(() => setLoading(false));
  }

  function incrementar(id) {
    setCartList((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        itens: item.itens?.map((produto) =>
          produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
        ),
      }))
    );
  }

  function decrementar(id) {
    setCartList((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        itens: item.itens?.map((produto) =>
          produto.id === id ? { ...produto, quantidade: Math.max(1, produto.quantidade - 1) } : produto
        ),
      }))
    );
  }

  function registrarPedido() {
    if (!usuario || cartList.length === 0) {
      console.error("Usuário ou carrinho vazio.");
      return;
    }

    const pedido = {
      usuarioId: usuario.id,
      itens: cartList.flatMap((item) => item.itens),
      total: cartList.reduce((acc, item) => {
        return acc + item.itens.reduce((subAcc, produto) => subAcc + parseFloat(produto.preco) * produto.quantidade, 0);
      }, 0),
      dataPedido: new Date().toISOString(),
    };

    apiPedidos
      .post("/pedidos", pedido)
      .then(({ data }) => {
        console.log("Pedido registrado com sucesso:", data);
        setPedidoList((prevPedidos) => [...prevPedidos, data]);
      })
      .catch((error) => console.error("Erro ao registrar pedido:", error));
  }

  function exportarPedido(cartList) {
    if (!usuario || Object.keys(usuario).length === 0) {
      console.error("Usuário não encontrado");
      return;
    }

    if (cartList.length === 0) {
      console.error("Carrinho vazio");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 10;

    // Informações do cliente
    const dadosExportados = {
      Nome: usuario.nome,
      Email: usuario.email,
      Telefone: usuario.telefone,
      Endereço: `${usuario.endRua}, ${usuario.endNum} - ${usuario.endCompl}`,
      Bairro: usuario.endBairro,
      Cidade: `${usuario.endCidade} - ${usuario.endUF}`,
      CEP: usuario.endCEP,
      Tipo: usuario.tipo,
    };

    Object.entries(dadosExportados).forEach(([chave, valor]) => {
      doc.text(`${chave}: ${valor || "-"}`, 10, y);
      y += 10;
    });

    y += 10;
    doc.text("Produtos do pedido:", 10, y);
    y += 10;

    // Listando produtos do carrinho
    cartList.forEach((item) => {
      item.itens.forEach((produto) => {
        doc.text(`- ${produto.nome} | Quantidade: ${produto.quantidade} | Preço: R$ ${produto.preco}`, 10, y);
        y += 10;
      });
    });

    doc.text(
      `Total do pedido: R$ ${cartList
        .reduce(
          (acc, item) => acc + item.itens.reduce((subAcc, produto) => subAcc + produto.preco * produto.quantidade, 0),
          0
        )
        .toFixed(2)}`,
      10,
      y
    );
    doc.save(`Pedido_${usuario.id}_Cliente_${usuario.nome || "cliente"}.pdf`);
  }

  function finalizarCompras() {
    registrarPedido();
    exportarPedido(cartList);
    limpa();
  }

  function limpa() {
    limparCarrinho();
    limparUsuarioCarrinho();
  }

  function limparUsuarioCarrinho() {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          const carrinhoId = data[0].id;
          return apiCarrinho.delete(`/carrinho/${carrinhoId}`);
        }
        throw new Error("Carrinho não encontrado");
      })
      .then(() => {
        // Limpa o estado local para refletir a exclusão
        setCartList([]);
      })
      .catch((error) => console.error("Erro ao excluir carrinho:", error))
      .finally(() => setLoading(false));
  }
  function atualizarItem(produtoId, produtoQuantidade) {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          const carrinho = data[0]; // Obtém o carrinho do usuário
          const itensAtualizados = carrinho.itens.map((produto) =>
            produto.id === produtoId ? { ...produto, quantidade: produtoQuantidade } : produto
          );

          // Atualiza na API com os novos valores
          return apiCarrinho.put(`/carrinho/${carrinho.id}`, { ...carrinho, itens: itensAtualizados });
        }
        throw new Error("Carrinho não encontrado");
      })
      .then(() => {
        // Atualiza o estado local após sucesso na API
        setCartList((prevCart) =>
          prevCart.map((item) => ({
            ...item,
            itens: item.itens.map((produto) =>
              produto.id === produtoId ? { ...produto, quantidade: produtoQuantidade } : produto
            ),
          }))
        );
      })
      .catch((error) => console.error("Erro ao atualizar item:", error))
      .finally(() => setLoading(false));
  }

  function excluirItem(itemId) {
    // Primeiro, obtém o carrinho do usuário para preservar os itens restantes
    const usuarioId = localStorage.getItem("usuario");
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          const carrinho = data[0]; // Considerando que há apenas um carrinho por usuário
          const itensAtualizados = carrinho.itens.filter((produto) => produto.id !== itemId);
          // Atualiza o carrinho na API com a nova lista de itens
          return apiCarrinho.put(`/carrinho/${carrinho.id}`, { ...carrinho, itens: itensAtualizados });
        }
        throw new Error("Carrinho não encontrado");
      })
      .then(() => {
        // Atualiza o estado local do carrinho após a exclusão bem-sucedida
        setCartList((prevCart) =>
          prevCart.map((item) => ({
            ...item,
            itens: item.itens.filter((produto) => produto.id !== itemId),
          }))
        );
      })
      .catch((error) => console.error("Erro ao excluir item:", error));
  }

  function limparCarrinho() {
    setLoading(true);
    apiCarrinho
      .get(`/carrinho?usuario=${usuarioId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          const carrinho = data[0];
          return apiCarrinho.put(`/carrinho/${carrinho.id}`, { ...carrinho, itens: [] });
        }
        throw new Error("Carrinho não encontrado");
      })
      .then(() => setCartList([]))
      .catch((error) => console.error("Erro ao limpar carrinho:", error))
      .finally(() => setLoading(false));
  }

  const totalValor = cartList.reduce((acc, item) => {
    return (
      acc + (item.itens?.reduce((subAcc, produto) => subAcc + parseFloat(produto.preco) * produto.quantidade, 0) || 0)
    );
  }, 0);

  return (
    <>
      {/* <Navbar onInicio={irParaInicio} nomeUsuario={nomeUsuario} /> */}
      <div className={styles.container}>
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
                <span> Quantidade: {produto.quantidade} </span>
                <button onClick={() => decrementar(produto.id)}> ➖ </button>
                <button onClick={() => incrementar(produto.id)}> ➕ </button>
                <button onClick={() => atualizarItem(produto.id, produto.quantidade)}> ✔ </button>
                <button onClick={() => excluirItem(produto.id)}> 🗑️ </button>
                {/* </p> */}
                <p>
                  <strong>Total:</strong> R$ {parseFloat(produto.preco * produto.quantidade).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        <p></p>
        <button onClick={limpa}>🗑️ Limpar Carrinho</button>
        <p></p>
        <button onClick={finalizarCompras}> ✔ Finalizar Compra </button>
        <p></p>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
    </>
  );
}

export default Cart;
