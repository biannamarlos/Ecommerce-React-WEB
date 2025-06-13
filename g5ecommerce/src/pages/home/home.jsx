import { useState } from "react";
import { Navbar } from "../../components/navbar/navBar";
import { SideBar } from "../../components/sideBar/sideBar";
import { Card } from "../../components/card/card";
import styles from "./home.module.css";
import { ButtonSB } from "../../components/buttonSB/buttonSB";
import { listarProdutos } from "../../services/produtos";

export function HomePage() {
    const [abrirSidebar, setabrirSidebar] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    function mostrarProdutos() {
        setLoading(true);
        listarProdutos()
            .then(response => setProdutos(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Navbar />
            <ButtonSB abrirSidebar={abrirSidebar} onClick={() => setabrirSidebar(open => !open)} />
            <SideBar abrirSidebar={abrirSidebar} onListarProdutos={mostrarProdutos} />
            <div className={styles.container}>
                {loading ? (
                    <p>Carregando...</p>
                ) : produtos.length > 0 ? (
                    <ul className={styles.cardGrid}>
                        {produtos.map((produto, index) => (
                            <Card key={produto.id || index}>
                                {produto.nome} - R$ {produto.preco}
                            </Card>
                        ))}
                    </ul>
                ) : (
                    <p>Nada por enquanto</p>
                )}
            </div>
        </>
    );
}