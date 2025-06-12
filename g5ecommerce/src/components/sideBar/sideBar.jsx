import styles from "./sideBar.module.css"
export function SideBar() {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.sideItens}>
                <li>Carrinho</li>
                <li>Perfil</li>
                <li>Registro</li>
                <li>Login</li>
            </ul>
        </div>

    )
}

