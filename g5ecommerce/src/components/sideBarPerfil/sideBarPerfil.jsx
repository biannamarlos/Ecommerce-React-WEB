import styles from "./sideBarPerfil.module.css";

export function SideBarPerfil({ abrirSidebar, onEditar, onLogout, onExcluir }) {
    return (
        <nav className={`${styles.sidebar} ${abrirSidebar ? styles.abrirSidebar : styles.fecharSidebar}`}>
            <ul className={styles.sideItens}>
                <li onClick={onEditar}>editar perfil</li>
                <li onClick={onExcluir}>excluir conta</li>
                <li onClick={onLogout}>logout</li>
            </ul>
        </nav>
    );
}