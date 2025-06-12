import styles from "./sideBar.module.css";

export function SideBar({ abrirSidebar }) {
    return (
        <nav className={`${styles.sidebar} ${abrirSidebar ? styles.abrirSidebar : styles.fecharSidebar}`}>
            <ul className={styles.sideItens}>
                <li>Carrinho</li>
                <li>Perfil</li>
                <li>Registro</li>
                <li>Login</li>
            </ul>
        </nav>
    );
}