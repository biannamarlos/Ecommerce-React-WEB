import styles from "./sideBar.module.css";

export function SideBar({ abrirSidebar, onListarProdutos }) {
    return (
        <nav className={`${styles.sidebar} ${abrirSidebar ? styles.abrirSidebar : styles.fecharSidebar}`}>
            <ul className={styles.sideItens}>
                <li>Categorias</li>
                <li onClick={onListarProdutos} className={styles.produtos}>Produtos</li>
            
            </ul>
        </nav>
    );
}