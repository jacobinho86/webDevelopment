import { Outlet } from "react-router-dom"; //this marks the place where the child route will be rendered
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}

export default RootLayout;