// Layout.jsx
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import Footer from "./Footer.jsx";
import { useColor } from '@/components/layouts/ColorContext.jsx';

export default function Layout({ className }) {
    const { headerColor, footerColor, backgroundColor } = useColor();

    return (
        <div className={classNames("flex flex-col min-h-screen", className)} style={{ backgroundColor }}>
            <Header style={{ backgroundColor: headerColor }} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}
