import { useState } from "react";
import { Navbar } from "../../components/navbar/navBar";
import { SideBar } from "../../components/sideBar/sideBar";
import { Card } from "../../components/card/card";
import styles from "./home.module.css";
import { ButtonSB } from "../../components/buttonSB/buttonSB";
import { listarProdutos, listarCategoriasUnicas } from "../../services/produtos";

export function HomePage() {
    const [abrirSidebar, setabrirSidebar] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tela, setTela] = useState("inicio");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

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
            const cats = await listarCategoriasUnicas();
            setCategorias(cats);
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

    return (
        <>
            <Navbar onInicio={irParaInicio} />
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
                        {categoriaSelecionada && (
                            <h3>Produtos da categoria: {categoriaSelecionada}</h3>
                        )}
                        {produtos.length > 0 ? (
                            <ul className={styles.cardGrid}>
                                {produtos.map((produto, index) => (
                                    <Card key={produto.id || index}>
                                        <li className={styles.produto}>
                                            {produto.nome} - R$ {produto.preco}
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
                        <ul className={styles.cardGrid}>
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