import { useState } from "react";
import styles from "./login.module.css";
import { apiUsuarios } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../utils/localstorage";

export function Login2() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    apiUsuarios
      .get(`/usuarios?email=${email}`)
      .then(({ data }) => {
        if (data.length > 0) {
          const usuarioEncontrado = data[0];
          if (usuarioEncontrado.email === email && usuarioEncontrado.senha === senha) {
            localStorage.setItem("usuario", usuarioEncontrado.id);
            localStorage.setItem("nomeUsuario", usuarioEncontrado.nome);
            navigate("/");
          }
        }
        // if (data.length > 0) {
        //   setUsuario(data);
        //   console.log(email);
        //   console.log(usuario);
        //   //localStorage.setItem("usuario", usuario[0].id);
        //   alert("Teste")
        // }
      })
      .catch((error) => console.error("Erro ao carregar usuário:", error));
    //   .finally(() => setLoading(false));
    /*try {
      const response = await apiUsuarios.get(`/usuarios?email=${email}`); 
         if (response.data.lenght > 0){
          setUsuario(data[0]);
          if (usuario.email === email && usuario.senha === senha){
            localStorage.setItem("usuario", usuario.id);
            console.log("Sucesso!")
          }
            
      }
    }catch (err){
      console.error("Erro", err)}*/
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>SISTEMA DE LOGIN</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Digite o seu e-mail:</label>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="seu@email.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Digite a sua senha:</label>
            <input
              className={styles.input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit">
              Entrar
            </button>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => {
                setEmail("");
                setSenha("");
              }}
            >
              Limpar
            </button>
          </div>
        </form>
        {/* Para visualizar os valores salvos */}
        {(email || senha) && (
          <div className={styles.savedInfo}>
            {email && <p>Email: {email}</p>}
            {senha && <p>Senha: ••••••••</p>}
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;
