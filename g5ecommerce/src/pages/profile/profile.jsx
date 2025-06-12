// IMPORTAÇÕES:
// CSS, ROTAS, USEEFFECT PARA MODIFICAR A PÁGINA LOGADA, INSTÂNCIA DO AXIOS

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUC } from "../../services/api"; 
import styles from "./profile.module.css"; 

export default function Perfil() {

    // DEFINE UM ESTADO USUÁRIO, COM SETUSER PARA ALTERAR
    // NAVIGATE PARA NAVEGAR NAS ROTAS
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // SALVA O USER LOGADO NO LOCALSTORAGE
    const userId = localStorage.getItem("userId");

    // TRAZ OS DADOS DO USUÁRIO LOGADO E SALVA NO SETUSER
    const getUserData = () => {
        apiUC
            .get(`/usuarios/${userId}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Erro ao buscar dados do usuário.", err));
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
                handleLogout();
            })
            .catch((err) => console.error("Erro ao deletar conta.", err));
        }
    };

}