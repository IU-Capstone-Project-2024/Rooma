import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import classNames from "classnames";

export default function Layout({className}) {
    return (
        <div className={classNames("flex flex-col min-h-screen", className)}>
            <Header/>
            <Outlet/>
        </div>
    );
}