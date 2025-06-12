import styles from "./buttonSB.module.css";

export function ButtonSB({ abrirSidebar, onClick }) {
    return (
        <button
            className={`${styles.buttonSB} ${abrirSidebar ? styles.abrir : styles.fechar}`}
            onClick={onClick}
        >
            {abrirSidebar ? "←" : "→"}
        </button>
    );
}