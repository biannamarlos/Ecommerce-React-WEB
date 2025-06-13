import styles from './register.module.css'

export function Register(){
    return (
            <div className={styles.registerEdit}>
                <div className={styles.caixaEdit}>
                    <div className={styles.logoSerratec}>
                        <a 
                            href="https://www.w3schools.com/css/css3_box-sizing.asp#gsc.tab=0"
                            target='blanck'
                        >
                            <img 
                                src="https://serratec.org/wp-content/uploads/2024/01/Group-63.svg" 
                                alt="logo serratec" 
                            />
                        </a>
                    </div>
                    <div className={styles.tituloEdit}>
                        <h1>Cadastro</h1>
                    </div>
                    <div className={styles.dadosEdit}>
                        <h1>Dados</h1>
                        <div className={styles.enterDados}>
                            <div className= {styles.inputDados}>
                                <p>Nome:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite seu nome...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>email:</p>
                                <input 
                                    type="email" 
                                    placeholder='Digite seu email...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>senha:</p>
                                <input 
                                    type="password" 
                                    placeholder='Digite sua senha...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Confirma senha:</p>
                                <input 
                                    type="password" 
                                    placeholder='Digite sua senha...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Telefone:</p>
                                <input 
                                    type="text" 
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
                                    placeholder='Digite seu cep...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Cidade:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite sua cidade...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>UF:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite sua uf...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Bairro:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite seu bairro...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Rua:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite sua rua...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Numero:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite seu numero...'
                                />
                            </div>
                            <div className= {styles.inputDados}>
                                <p>Complemento:</p>
                                <input 
                                    type="text" 
                                    placeholder='Digite seu complemento...'
                                />
                            </div>
                        </div>
                        <form className={styles.formCadastrar}> 
                            <button
                                className={styles.cadastraButton}
                                type='submit'
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    )
}