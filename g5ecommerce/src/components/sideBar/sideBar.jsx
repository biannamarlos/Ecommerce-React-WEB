import styles from "./sideBar.module.css";

export function SideBar({ abrirSidebar, onListarProdutos, onListarCategorias }) {
    return (
        <nav className={`${styles.sidebar} ${abrirSidebar ? styles.abrirSidebar : styles.fecharSidebar}`}>
            <ul className={styles.sideItens}>
                <li onClick={onListarCategorias} className={styles.categorias}>Categorias</li>
                <li onClick={onListarProdutos} className={styles.produtos}>Produtos</li>
            </ul>
        </nav>
    );
}