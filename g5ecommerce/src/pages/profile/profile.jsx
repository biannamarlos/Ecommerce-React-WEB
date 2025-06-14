// IMPORTAÇÕES:
// CSS, ROTAS, USEEFFECT PARA MODIFICAR A PÁGINA LOGADA, INSTÂNCIA DO AXIOS, NAVBAR, SIDEBAR

import { Navbar } from "../../components/navbar/navBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsuarios as apiUC } from "../../services/api";
import { ButtonSB } from "../../components/buttonSB/buttonSB";
import { SideBarPerfil } from "../../components/sideBarPerfil/sideBarPerfil";
import styles from "./profile.module.css"; 

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
    const userId = 33;

    // TRAZ OS DADOS DO USUÁRIO LOGADO E SALVA NO SETUSER
    const getUserData = () => {
    console.log("🚀 Buscando dados do usuário com ID:", userId);
    apiUC
        .get(`/usuarios/${userId}`)
        .then((res) => {
            console.log("✅ Dados recebidos:", res.data);
            setUser(res.data);
            setFormData(res.data);
        })
        .catch((err) => {
            console.error("❌ Erro ao buscar dados do usuário.", err);
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
    navigate("/login");
    };

    // CONFIRMAÇÃO DO USUÁRIO, API -> DELETE
    const deletar = () => {
        const confirmar = confirm("Tem certeza que deseja deletar sua conta?");
        if (confirmar) {
            apiUC
            .delete(`/usuarios/${userId}`)
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
        .put(`/usuarios/${userId}`, formData)
        .then(() => {
            alert("Dados atualizados com sucesso!");
            setEditando(false);
            getUserData();
        })
        .catch((err) => console.error("Erro ao atualizar dados.", err));
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <ButtonSB abrirSidebar={menuAberto} onClick={alternarMenu} />
            <SideBarPerfil
                abrirSidebar={menuAberto}
                onEditar={alternarEdicao}
                onExcluir={deletar}
                onLogout={logout}
            />
            <div className={styles.profileWrapper}>
                <div className={styles.titleContainer}>
                    <h1>Perfil do Usuário</h1>
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
                        </div>
                    </div>
                ) : (
                    <div className={styles.editContainer}>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={formData.telefone || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endRua"
                            placeholder="Rua"
                            value={formData.endRua || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endNum"
                            placeholder="Número"
                            value={formData.endNum || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endCompl"
                            placeholder="Complemento"
                            value={formData.endCompl || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endBairro"
                            placeholder="Bairro"
                            value={formData.endBairro || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endCidade"
                            placeholder="Cidade"
                            value={formData.endCidade || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endUF"
                            placeholder="Estado"
                            value={formData.endUF || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="endCEP"
                            placeholder="CEP"
                            value={formData.endCEP || ""}
                            onChange={alterarCampo}
                        />
                        <input
                            type="text"
                            name="tipo"
                            placeholder="Tipo"
                            value={formData.tipo || ""}
                            onChange={alterarCampo}
                        />
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