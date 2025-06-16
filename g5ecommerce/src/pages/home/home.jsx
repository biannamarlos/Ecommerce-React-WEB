import { useState } from "react";
import { Navbar } from "../../components/navbar/navBar";
import { SideBar } from "../../components/sideBar/sideBar";
import { Card } from "../../components/card/card";
import styles from "./home.module.css";
import { ButtonSB } from "../../components/buttonSB/buttonSB";
import { listarProdutos, listarCategoriasUnicas } from "../../services/produtos";
import { apiCarrinho } from "../../services/api";

export function HomePage() {
  const [abrirSidebar, setabrirSidebar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tela, setTela] = useState("inicio");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [quantidade, setQuantidade] = useState({});
  const nomeUsuario = localStorage.getItem("nomeUsuario");

  function irParaInicio() {
    setTela("inicio");
    setProdutos([]);
    setCategorias([]);
    setCategoriaSelecionada(null);
  }

  function mostrarProdutos() {
    setLoading(true);
    setTela("produtos");
    setCategoriaSelecionada(null);
    listarProdutos()
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  async function mostrarCategorias() {
    setLoading(true);
    setTela("categorias");
    setCategoriaSelecionada(null);
    try {
      const categorias = await listarCategoriasUnicas();
      setCategorias(categorias);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function mostrarProdutosPorCategoria(categoria) {
    setLoading(true);
    setTela("produtos");
    setCategoriaSelecionada(categoria);
    listarProdutos()
      .then((response) => {
        const filtrados = response.data.filter((p) => p.categoria === categoria);
        setProdutos(filtrados);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  function incrementar(id) {
    setQuantidade((q) => ({
      ...q,
      [id]: (q[id] || 1) + 1,
    }));
  }

  function decrementar(id) {
    setQuantidade((q) => ({
      ...q,
      [id]: q[id] > 1 ? q[id] - 1 : 1,
    }));
  }


async function adicionarAoCarrinho(produto, quantidadeParaAdicionar) {
  const usuarioId = localStorage.getItem("usuario");
  let carrinhoApi = [];

  try {
    const { data } = await apiCarrinho.get(`/carrinho?usuario=${usuarioId}`);
    if (data && data.length > 0) {
      carrinhoApi = data[0].itens || [];
      const indexProduto = carrinhoApi.findIndex(item => item.id === produto.id);
      if (indexProduto >= 0) {
        carrinhoApi[indexProduto].quantidade += quantidadeParaAdicionar;
      } else {
        carrinhoApi.push({ ...produto, quantidade: quantidadeParaAdicionar });
      }
      await apiCarrinho.put(`/carrinho/${data[0].id}`, {
        usuario: usuarioId,
        itens: carrinhoApi,
      });
    } else {
      carrinhoApi = [{ ...produto, quantidade: quantidadeParaAdicionar }];
      await apiCarrinho.post(`/carrinho`, {
        usuario: usuarioId,
        itens: carrinhoApi,
      });
    }
    alert("Produto adicionado ao carrinho!");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      try {
        carrinhoApi = [{ ...produto, quantidade: quantidadeParaAdicionar }];
        await apiCarrinho.post(`/carrinho`, {
          usuario: usuarioId,
          itens: carrinhoApi,
        });
        alert("Produto adicionado ao carrinho!");
      } catch (err) {
        alert("Falha ao salvar carrinho na API!");
        console.error(err);
      }
    } else {
      alert("Falha ao salvar carrinho na API!");
      console.error(error);
    }
  }
}

  return (
    <>
      <Navbar onInicio={irParaInicio} nomeUsuario={nomeUsuario} />
      <ButtonSB abrirSidebar={abrirSidebar} onClick={() => setabrirSidebar((open) => !open)} />
      <SideBar abrirSidebar={abrirSidebar} onListarProdutos={mostrarProdutos} onListarCategorias={mostrarCategorias} />
      <div className={styles.container}>
        {loading ? (
          <p>Carregando...</p>
        ) : tela === "inicio" ? (
          <h2>Bem-vindo ao nosso site</h2>
        ) : tela === "produtos" ? (
          <>
            <div className={styles.prodCat}>
              {categoriaSelecionada && <h3>Produtos da categoria: {categoriaSelecionada}</h3>}
            </div>
            {produtos.length > 0 ? (
              <ul className={styles.cardGrid}>
                {produtos.map((produto) => (
                  <Card key={produto.id}>
                    <li className={styles.produto}>
                      <div className={styles.infoColuna}>
                        <img src={produto.foto} alt={produto.nome} className={styles.imagemProduto} />
                        <strong className={styles.nome}>{produto.nome}</strong>
                        <span className={styles.preco}>R$ {produto.preco}</span>
                        <span className={styles.descricao}>Descrição: {produto.descricao}</span>
                        <div className={styles.quantidade}>
                          <button onClick={() => decrementar(produto.id)}> ➖ </button>
                          <span>{quantidade[produto.id] || 1}</span>
                          <button onClick={() => incrementar(produto.id)}> ➕ </button>
                        </div>
                        <button
                          className={styles.botaoAdd}
                          onClick={() => adicionarAoCarrinho(produto, quantidade[produto.id] || 1)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </li>
                  </Card>
                ))}
              </ul>
            ) : (
              <p>Nenhum produto encontrado</p>
            )}
          </>
        ) : categorias.length > 0 ? (
          <ul className={styles.cardGridCategorias}>
            {categorias.map((categoria, index) => (
              <Card key={index}>
                <li className={styles.categoria} onClick={() => mostrarProdutosPorCategoria(categoria)}>
                  {categoria}
                </li>
              </Card>
            ))}
          </ul>
        ) : (
          <p>Nenhuma categoria encontrada</p>
        )}
      </div>
    </>
  );
}