import styles from "../about/about.module.css";

const agentes = [
  { nome: "Dandara DevOps Digital Identity", imagem: "/Dandara.png", descricao: "Arrasa com o uso de estados e hooks para gerenciar dados do usuário, controla formulários e integra chamadas a APIs REST para obter, atualizar e deletar dados. Implementa navegação entre páginas, lógica para alternar interfaces, confirmações e exportação de dados em PDF." },
  { nome: "Marlos DevOps Commerce", imagem: "/Marlos.png", descricao: "React para criar uma página de carrinho de compras, carregar dados do usuário e dos produtos usando APIs, carrinho interativo, com botões para aumentar, diminuir ou tirar produtos. Ele atualiza o carrinho tanto na tela quanto no servidor, garantindo que tudo fique sincronizado. Também usou ferramentas do React para controlar a navegação entre páginas e deixou o visual organizado, simples e bonito." },
  { nome: "Mateus DevOps Interface", imagem: "/Mateus.png", descricao: "React para criar interfaces dinâmicas. Gerenciar o estado da aplicação, controlando diferentes telas e atualizando dados ao vivo. Conhecimento em manipulação de dados locais com localStorage, front-end com APIs REST. " },
  { nome: "Enzo DevOps enrollment", imagem: "/Enzo.png", descricao: "Controle de formulários e validação de dados. Implementação lógica de cadastro de usuários com integração a APIs REST, estruturando dados de forma organizada e tratando respostas e erros do servidor com feedback ao usuário. Ótimas práticas de organização com CSS Modules e uso eficiente de hooks como useState." },
  { nome: "Karen DevOps Presentation", imagem: "/Karen.png", descricao: "Componentes em React, organização de código, estilização com CSS Modules, navegação entre páginas. Participação da estruturação visual, contribuindo para a clareza e funcionalidade das interfaces." },
  { nome: "Adriana DevOps Access", imagem: "/Adriana.png", descricao: "Manipular estados com hooks, controlar formulários e tratar eventos de envio. Implementou comunicação com API para validar o usuário, usar o armazenamento local (localStorage) para salvar informações do usuário logado. Cuidou da navegação usando React Router e aplicou estilos organizados com CSS Modules." },
];

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Agentes da Equipe</h1>
      <div className={styles.agentes}>
        {agentes.map((agente, index) => (
          <div
            className={styles.card}
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img
              src={agente.imagem}
              alt={agente.nome}
              className={styles.produtoImagem}
              loading="lazy"
            />
            <h2>{agente.nome}</h2>
            <p>{agente.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

