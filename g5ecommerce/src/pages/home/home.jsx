import { Navbar } from "../../components/navbar/navBar"
import { SideBar } from "../../components/sideBar/sideBar"
import styles from "./home.module.css"
export function HomePage() {
    return (
        <>
        <Navbar />
        <SideBar />
        <div className={styles.container}>
            <h1>Home</h1>
        </div>
        </>
    )
}