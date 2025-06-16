// IMPORTAÇÕES:
// CSS, ROTAS, USEEFFECT PARA MODIFICAR A PÁGINA LOGADA, INSTÂNCIA DO AXIOS, NAVBAR, SIDEBAR

import { Navbar } from "../../components/navbar/navBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsuarios as apiUC } from "../../services/api";
import { ButtonSB } from "../../components/buttonSB/buttonSB";
import { SideBarPerfil } from "../../components/sideBarPerfil/sideBarPerfil";
import styles from "./profile.module.css"; 
import jsPDF from "jspdf";

export default function Perfil() {

    // DEFINE UM ESTADO USUÁRIO, COM SETUSER PARA ALTERAR
    // NAVIGATE PARA NAVEGAR NAS ROTAS
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    // ALTERNAR MENU INTERATIVO
    const [menuAberto, setMenuAberto] = useState(false);

    const alternarMenu = () => {
         setMenuAberto(!menuAberto);
    };

    // ALTERAR PERFIL
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({});

    // SALVA O USER LOGADO NO LOCALSTORAGE
    const userId = localStorage.getItem("usuario");
    // const userId = 33;

    // TRAZ OS DADOS DO USUÁRIO LOGADO E SALVA NO SETUSER
    const getUserData = () => {
    console.log("Buscando dados do usuário com ID:", userId);
    apiUC
        apiUC.get(`/usuarios/${userId}`)
        .then((res) => {
            console.log("Dados recebidos:", res.data);
            setUser(res.data);
            setFormData(res.data);
        })
        .catch((err) => {
            console.error("Erro ao buscar dados do usuário.", err);
        });
    };

    // EMITE NA TELA OS DADOS DO USUÁRIO LOGADO
    useEffect   (  () => {
    getUserData();
    }, []);
    
    // FUNÇÕES:

    // LOGOUT - LIMPA OS DADOS USUÁRIO LOGADO
    // ENVIA PARA O LOGIN
    const logout = () => {
    localStorage.clear();
    navigate("/");
    };

    // CONFIRMAÇÃO DO USUÁRIO, API -> DELETE
    const deletar = () => {
        const confirmar = confirm("Tem certeza que deseja deletar sua conta?");
        if (confirmar) {
            apiUC
            apiUC.delete(`/usuarios/${userId}`)
            .then(() => {
                alert("Conta deletada com sucesso!");
                logout();
            })
            .catch((err) => console.error("Erro ao deletar conta.", err));
        }
    };

    // ALTERNA A EDIÇÃO - SE FOR TRUE, EXIBE INPUTS EDITÁVEIS
    const alternarEdicao = () => {
        setEditando(!editando);
    };

    // FUNÇÃO CHAMADA QUANDO UM CAMPO DO FORMULÁRIO FOR ALTERADO
    const alterarCampo = (e) => {
        // e ELEMENTO QUE DISPAROU O EVENTO (INPUT)
        const { name, value } = e.target;
        // ATUALIZA O SETFORMDATA, MANTÉM O ...ANTES E MUDA APENAS O CAMPO "NAME"
        // COM VALOR "VALUE"
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // SALVA AS ALTERAÇÕES REALIZADAS NO USUÁRIO LOGADO
    const salvarAlteracoes = () => {
        apiUC
        apiUC.put(`/usuarios/${userId}`, formData)
        .then(() => {
            alert("Dados atualizados com sucesso!");
            setEditando(false);
            getUserData();
        })
        .catch((err) => console.error("Erro ao atualizar dados.", err));
    };

    // FUNÇÃO EXPORTARPDF, CRIA UM DOC (PDF) EM BRANCO PELA BIBLIOTECA JSPDF
    const exportarPDF = () => {
        const doc = new jsPDF();
        // DECLARA O TAMANHO DA FONTE DO PDF
        doc.setFontSize(12);
        // POSIÇÃO VERTICAL DO TEXTO, PARA NÃO COLAR NO TOPO DA PÁGINA
        let y = 10;

        // OBJETO JAVA SCRIPT ASSOCIADO AO VALOR DO USER.
        const dadosExportados = {
            Nome: user.nome,
            Email: user.email,
            Telefone: user.telefone,
            Endereço: `${user.endRua}, ${user.endNum} - ${user.endCompl}`,
            Bairro: user.endBairro,
            Cidade: `${user.endCidade} - ${user.endUF}`,
            CEP: user.endCEP,
            Tipo: user.tipo,
        };

        // TRANSFORMA O OBJETO EM UMA LISTA DE PARES
        // FOR EACH PERCORRE, ESCREVENDO NO PDF A CHAVE E O VALOR
        // CASO SEJA NULO, APRESENTA -
        // VALOR DE Y INCREMENTADO A CADA LINHA ESCRITA
        Object.entries(dadosExportados).forEach(([chave, valor]) => {
           doc.text(`${chave}: ${valor || "-"}`, 10, y);
            y += 10;
        });

        // SALVA O PDF NO NAVEGADOR COM O NOME DADOS_NOME.PDF
        doc.save(`dados_${user.nome || "usuario"}.pdf`);
    };

    return (
        <div className={styles.container}>
            <Navbar onInicio={() => navigate("/")} nomeUsuario={user.nome} />
            <ButtonSB abrirSidebar={menuAberto} onClick={alternarMenu} />
            <SideBarPerfil
                abrirSidebar={menuAberto}
                onEditar={alternarEdicao}
                onExcluir={deletar}
                onLogout={logout}
            />

            <div className={styles.profileWrapper}>
                <div className={styles.titleContainer}>
                    <h1>Olá, {user.nome ? user.nome : "Usuário"}</h1>
                </div>
                {!editando ? (
                    <div className={styles.infoContainer}>
                        <p><strong>Nome:</strong> {user.nome}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Telefone:</strong> {user.telefone}</p>
                        <p><strong>Endereço:</strong> {user.endRua}, {user.endNum} - {user.endCompl}</p>
                        <p><strong>Bairro:</strong> {user.endBairro}</p>
                        <p><strong>Cidade:</strong> {user.endCidade} - {user.endUF}</p>
                        <p><strong>CEP:</strong> {user.endCEP}</p>
                        <p><strong>Tipo:</strong> {user.tipo}</p>

                        <div className={styles.buttonGroup}>
                            <button onClick={alternarEdicao}>EDITAR PERFIL</button>
                            <button onClick={logout}>LOGOUT</button>
                            <button onClick={deletar}>DELETAR CONTA</button>
                            <button onClick={exportarPDF}>EXPORTAR DADOS (PDF)</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.editContainer}>
                        <div className={styles.inputGroup}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Rua:</label>
                            <input
                                type="text"
                                name="endRua"
                                value={formData.endRua || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Número:</label>
                            <input
                                type="text"
                                name="endNum"
                                value={formData.endNum || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Complemento:</label>
                            <input
                                type="text"
                                name="endCompl"
                                value={formData.endCompl || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Bairro:</label>
                            <input
                                type="text"
                                name="endBairro"
                                value={formData.endBairro || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Cidade:</label>
                            <input
                                type="text"
                                name="endCidade"
                                value={formData.endCidade || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Estado (UF):</label>
                            <input
                                type="text"
                                name="endUF"
                                value={formData.endUF || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>CEP:</label>
                            <input
                                type="text"
                                name="endCEP"
                                value={formData.endCEP || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Tipo:</label>
                            <input
                                type="text"
                                name="tipo"
                                value={formData.tipo || ""}
                                onChange={alterarCampo}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button onClick={salvarAlteracoes}>SALVAR</button>
                            <button onClick={alternarEdicao}>CANCELAR</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}