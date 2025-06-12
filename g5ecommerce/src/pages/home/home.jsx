import { useState } from "react";
import { Navbar } from "../../components/navbar/navBar"
import { SideBar } from "../../components/sideBar/sideBar"
import { Card } from "../../components/card/card"
import styles from "./home.module.css"
import { ButtonSB } from "../../components/buttonSB/buttonSB";

export function HomePage() {
    const [abrirSidebar, setabrirSidebar] = useState(false);

    const produtos = [
        {
            id: 1,
            name: "Produto 1",
            preço: 10.99
        },
        {
            id: 2,
            name: "Produto 2",
            preço: 10.99
        },
        {
            id: 3,
            name: "Produto 3",
            preço: 10.99
        },
        {
            id: 4,
            name: "Produto 4",
            preço: 10.99
        },
        {
            id: 5,
            name: "Produto 5",
            preço: 10.99
        },
        {
            id: 6,
            name: "Produto 6",
            preço: 10.99
        }

    ];



    return (
        <>
            <Navbar />
            <ButtonSB
                abrirSidebar={abrirSidebar} onClick={() => setabrirSidebar(open => !open)} />
            <SideBar abrirSidebar={abrirSidebar} />

            <div className={styles.container}>
                <ul className={styles.cardGrid}>
                    {produtos.map((produto, index) => (
                        <Card key={index}>
                            {produto.name} - R$ {produto.preço}
                        </Card>
                    ))}
                </ul>
            </div>
        </>
    )
}