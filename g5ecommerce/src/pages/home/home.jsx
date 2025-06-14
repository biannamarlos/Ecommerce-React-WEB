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
    const [quantidade, setQuantidade] = useState({})
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
            .then(response => setProdutos(response.data))
            .catch(error => console.error(error))
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
            .then(response => {
                const filtrados = response.data.filter(p => p.categoria === categoria);
                setProdutos(filtrados);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }

    function incrementar(id) {
        setQuantidade(q => ({
            ...q,
            [id]: (q[id] || 1) + 1
        }));
    }

    function decrementar(id) {
        setQuantidade(q => ({
            ...q,
            [id]: q[id] > 1 ? q[id] - 1 : 1
        }));
    }

    async function adicionarAoCarrinho(produto, quantidade) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const indexProduto = carrinho.findIndex(item => item.id === produto.id);
        if (indexProduto >= 0) {
            carrinho[indexProduto].quantidade += quantidade;
        } else {
            carrinho.push({ ...produto, quantidade });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));


        try {
            await salvarCarrinhoNaAPI(carrinho);
            alert('Produto adicionado ao carrinho!');
        } catch (error) {
            alert("Falha ao salvar carrinho na API!");
            console.error(error);
        }
    }

    async function salvarCarrinhoNaAPI(carrinho) {
        try {
            const response = await fetch("https://681c9922f74de1d219ad056c.mockapi.io/api/carrinho", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId, itens: carrinho }),
            });
            if (!response.ok) throw new Error("Erro ao salvar carrinho na API");
        } catch (error) {
            alert("Falha ao salvar carrinho na API!");
            console.error(error);
        }
    }

    async function salvarCarrinhoNaAPI(carrinho) {
        const usuarioId = localStorage.getItem('usuario');
        await apiCarrinho.post("/carrinho", {
            usuario: usuarioId,
            itens: carrinho
        });
    }

    return (
        <>
            <Navbar onInicio={irParaInicio} nomeUsuario={nomeUsuario} />
            <ButtonSB abrirSidebar={abrirSidebar} onClick={() => setabrirSidebar(open => !open)} />
            <SideBar
                abrirSidebar={abrirSidebar}
                onListarProdutos={mostrarProdutos}
                onListarCategorias={mostrarCategorias}
            />
            <div className={styles.container}>
                {loading ? (
                    <p>Carregando...</p>
                ) : tela === "inicio" ? (
                    <h2>Bem-vindo ao nosso site</h2>
                ) : tela === "produtos" ? (
                    <>
                        <div className={styles.prodCat}>

                            {categoriaSelecionada && (
                                <h3 >Produtos da categoria: {categoriaSelecionada}</h3>
                            )}
                        </div>
                        {produtos.length > 0 ? (
                            <ul className={styles.cardGrid}>
                                {produtos.map((produto, index) => (
                                    <Card key={produto.id || index}>
                                        <li className={styles.produto}>
                                            <div className={styles.infoColuna}>
                                                <img
                                                    src={produto.foto}
                                                    alt={produto.nome}
                                                    className={styles.imagemProduto}
                                                />
                                                <strong className={styles.nome}>{produto.nome}</strong>
                                                <span className={styles.preco}>R$ {produto.preco}</span>
                                                <span className={styles.descricao}>Descrição: {produto.descricao}</span>
                                                <div className={styles.quantidade}>
                                                    <button onClick={() => decrementar(produto.id || index)}> ➖ </button>
                                                    <span>{quantidade[produto.id || index] || 1}</span>
                                                    <button onClick={() => incrementar(produto.id || index)}> ➕ </button>
                                                </div>
                                                <button
                                                    className={styles.botaoAdd}
                                                    onClick={() =>
                                                        adicionarAoCarrinho(
                                                            produto,
                                                            quantidade[produto.id || index] || 1
                                                        )
                                                    }
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
                ) : (
                    categorias.length > 0 ? (
                        <ul className={styles.cardGridCategorias}>
                            {categorias.map((categoria, index) => (
                                <Card key={index}>
                                    <li className={styles.categoria}
                                        onClick={() => mostrarProdutosPorCategoria(categoria)}
                                    >

                                        {categoria}
                                    </li>
                                </Card>
                            ))}
                        </ul>

                    ) : (
                        <p>Nenhuma categoria encontrada</p>
                    )
                )}
            </div>
        </>
    );
}