import styles from "../about/about.module.css";

const agentes = [
  { nome: "Dandara", imagem: "/Dandara.png", descricao: "qualquer coisa." },
  { nome: "Marlos", imagem: "/Marlos.png", descricao: "oi." },
  { nome: "Mateus", imagem: "/Mateus.png", descricao: "tudo bem." },
  { nome: "Enzo", imagem: "/Enzo.png", descricao: "eu nao sei." },
  { nome: "Karen", imagem: "/Karen.png", descricao: "sei de nada." },
  { nome: "Adriana", imagem: "/Adriana.png", descricao: "Coisas sobre a Adriana" },
];

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Agentes da Equipe</h1>
      <div className={styles.agentes}>
        {agentes.map((agente, index) => (
          <div>
            {/* className={`${styles.card} ${styles.fadeIn}`} key={index} style={{ animationDelay: `${index * 0.2}s` }}> */}
            <img src={agente.imagem} alt={agente.nome} />
            <h2>{agente.nome}</h2>
            <p>{agente.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
