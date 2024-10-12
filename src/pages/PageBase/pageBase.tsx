import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/header";

export function PageBase() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}