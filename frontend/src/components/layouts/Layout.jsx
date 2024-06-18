import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import classNames from "classnames";
import Footer from "./Footer.jsx";

export default function Layout({className}) {
    return (
        <div className={classNames("flex flex-col min-h-screen", className)}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}