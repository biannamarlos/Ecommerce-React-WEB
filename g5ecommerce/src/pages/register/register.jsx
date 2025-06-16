import { useState } from 'react'
import styles from './register.module.css'
import { apiUsuarios } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Register(){
    const[nome, setNome] = useState("")
    const[email, setEmail] = useState("")
    const[senha, setsenha] = useState("")
    const[confirmaSenha, setConfirmaSenha] = useState("")
    const[telefone, setTelefone] = useState("")
    const[cep, setCep] = useState("")
    const[cidade, setCidade] = useState("")
    const[uf, setUf] = useState("")
    const[bairro, setBairro] = useState("")
    const[rua, setRua] = useState("")
    const[numero, setNumero] = useState("")
    const[complemento, setComplemento] = useState("")
    const navigate = useNavigate();

    const handleRegister = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmaSenha || !telefone) {
        return;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha,
        endRua: rua,
        endNum: numero,
        endCompl: complemento,
        endBairro: bairro,
        endCidade: cidade,
        endUF: uf,
        endCEP: cep,
        telefone
    };

    apiUsuarios
        .post("/usuarios", usuario)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                alert("Usuário cadastrado com sucesso!");
                // Limpar os campos:
                setNome(""); setEmail(""); setsenha(""); setConfirmaSenha(""); setTelefone("");
                setCep(""); setCidade(""); setUf(""); setBairro(""); setRua(""); setNumero(""); setComplemento("");
                navigate("/login")
            }
        })
        .catch((error) => {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário");
        });
};

const handleVoltar = () =>{
    navigate("/")
}

    return (
            <div className={styles.registerEdit}>
                <div className={styles.caixaEdit}>
                    <div className={styles.dadosEdit}>
                        <h1>Dados</h1>
                        <form 
                            className={styles.formCadastrar}
                            onSubmit={handleRegister}
                        >
                            <div className={styles.enterDados}>
                                <div className= {styles.inputDados}>
                                    <p>Nome:</p>
                                    <input 
                                        type="text" 
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder='Digite seu nome...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Email:</p>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Digite seu email...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Senha:</p>
                                    <input 
                                        type="password" 
                                        value={senha}
                                        onChange={(e) => setsenha(e.target.value)}
                                        placeholder='Digite sua senha...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Confirma senha:</p>
                                    <input 
                                        type="password" 
                                        value={confirmaSenha}
                                        onChange={(e) => setConfirmaSenha(e.target.value)}
                                        placeholder='Digite sua senha...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Telefone:</p>
                                    <input 
                                        type="text" 
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        placeholder='Digite seu nome...'
                                    />
                                </div>
                                    
                            </div>
                            <h1>Endereço</h1>
                            <div className={styles.enterEndereco}> 
                                <div className= {styles.inputDados}>
                                    <p>CEP:</p>
                                    <input 
                                        type="text" 
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)}
                                        placeholder='Digite seu cep...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Cidade:</p>
                                    <input 
                                        type="text" 
                                        value={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                        placeholder='Digite sua cidade...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>UF:</p>
                                    <input 
                                        type="text"
                                        value={uf}
                                        onChange={(e) => setUf(e.target.value)} 
                                        placeholder='Digite sua uf...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Bairro:</p>
                                    <input 
                                        type="text" 
                                        value={bairro}
                                        onChange={(e) => setBairro(e.target.value)}
                                        placeholder='Digite seu bairro...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Rua:</p>
                                    <input 
                                        type="text" 
                                        value={rua}
                                        onChange={(e) => setRua(e.target.value)}
                                        placeholder='Digite sua rua...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Numero:</p>
                                    <input 
                                        type="text" 
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                        placeholder='Digite seu numero...'
                                    />
                                </div>
                                <div className= {styles.inputDados}>
                                    <p>Complemento:</p>
                                    <input 
                                        type="text" 
                                        value={complemento}
                                        onChange={(e) => setComplemento(e.target.value)}
                                        placeholder='Digite seu complemento...'
                                    />
                                </div>
                            </div> 
                            <div className={styles.buttonsEdit}> 
                                <button
                                    className={styles.cadastraButton}
                                    type='submit'
                                >
                                    Cadastrar
                                </button>
                                <button
                                    className={styles.cadastraButton}
                                    type='text'
                                    onClick={handleVoltar}
                                >
                                    Voltar
                                </button>
                            </div>   
                        </form>
                    </div>
                </div>
            </div>
    )
}