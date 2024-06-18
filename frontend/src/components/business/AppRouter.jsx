import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/layouts/Layout.jsx";
import Main from "@/pages/Main/Main.jsx";
import Auth from "@/pages/Auth/Auth.jsx";
import NotFound from "@/pages/NotFound/NotFound.jsx";


const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout className="bg-[#3FC7B8]"/>}>
                    <Route path="" element={<Main/>} />
                    <Route path="auth" element={<Auth/>} />
                    <Route path="*" element={<NotFound/>} />
                    {/*<Route path="/about" element={<About/>}/>*/}
                </Route>
            </Routes>

        </>
    );
};

export default AppRouter;