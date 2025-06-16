import styles from './about.module.css';


const agentes = [
  { nome: "Dandara", imagem: "/imagens/Dandara.jpg", descricao: "qualquer coisa." },
  { nome: "Marlos", imagem: "/imagens/Marlos.jpg", descricao: "oi." },
  { nome: "Mateus", imagem: "/imagens/Mateus.jpg", descricao: "tudo bem." },
  { nome: "Enzo", imagem: "/imagens/Enzo.jpg", descricao: "eu nao sei." },
  { nome: "Karen", imagem: "/imagens/Karen.jpg", descricao: "sei de nada." }
];


function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Agentes da Equipe</h1>
      <div>
        {agentes.map((agente, index) => (
          <div
            className={`${styles.card} ${styles.fadeIn}`}
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
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