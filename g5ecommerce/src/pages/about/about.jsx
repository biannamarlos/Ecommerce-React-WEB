import styles from './about.module.css';
import DandaraImg from './assets/Dandara.jpg';
import MarlosImg from './assets/Marlos.jpg';
import MateusImg from './assets/Mateus.jpg';
import EnzoImg from './assets/Enzo.jpg';
import KarenImg from './assets/Karen.jpg';

const agentes = [
  { nome: "Dandara", imagem: DandaraImg, descricao: "qualquer coisa." },
  { nome: "Marlos", imagem: MarlosImg, descricao: "oi." },
  { nome: "Mateus", imagem: MateusImg, descricao: "tudo bem." },
  { nome: "Enzo", imagem: EnzoImg, descricao: "eu nao sei." },
  { nome: "Karen", imagem: KarenImg, descricao: "sei de nada." }
];

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Agentes da Equipe</h1>
      <div className={styles.agentes}>
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