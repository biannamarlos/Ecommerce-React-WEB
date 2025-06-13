import { useNavigate } from "react-router-dom";
import styles from "./navBar.module.css"

export function Navbar({ onInicio }) {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      
      <div className={styles.logoBox}>
        <img
          className={styles.logoImage}
          alt="imagem"
          src="https://biomob.org/_next/image?url=%2FpartnesLogos%2Fserratec_branco.png&w=3840&q=100"
        />
      </div>
      
      <ul className={styles.navItens}>
        <li className={styles.navInicio} onClick={onInicio}>Inicio</li>
        <li className={styles.navRegistro} onClick={()=> navigate("/cadastrar")} >Registro</li>
        <li>Login</li>
      </ul>
     
      <button className={styles.carrinhoBtn} title="Carrinho">
        🛒
      </button>
    </nav>
  );
}


