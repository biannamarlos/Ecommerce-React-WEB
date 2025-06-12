import styles from "./sideBar.module.css";

export function SideBar({ abrirSidebar }) {
    return (
        <nav className={`${styles.sidebar} ${abrirSidebar ? styles.abrirSidebar : styles.fecharSidebar}`}>
            <ul className={styles.sideItens}>
                <li>Categorias</li>
                <li>Pordutos</li>
            
            </ul>
        </nav>
    );
}