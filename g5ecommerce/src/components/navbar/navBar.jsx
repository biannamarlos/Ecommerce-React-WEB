import styles from "./navBar.module.css"

export function Navbar({onInicio}) {
  return (
    <>
      <nav className={styles.navbar}>
        <img
          style={{ width: "170px", height: "80px", paddingBottom: "1.5rem" }}
          className={styles.logoImage}
          src="https://biomob.org/_next/image?url=%2FpartnesLogos%2Fserratec_branco.png&w=3840&q=100"
          alt="imagem" />
        <ul className={styles.navItens}>
          <li className={styles.navInicio} onClick={onInicio}>Inicio</li>
          <li>Registro</li>
          <li>Login</li>
        </ul>
      </nav>
    </>
  );
}


