import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/layouts/Layout.jsx";
import Main from "@/pages/Main/Main.jsx";
import NotFound from "@/pages/NotFound/NotFound.jsx";
import JoinGame from "@/pages/JoinGame/JoinGame.jsx"
import Auth from "@/pages/Auth/Auth.jsx";

import RequireAuth from "@/components/business/RequireAuth.jsx";
import {AuthProvider} from "@/components/business/AuthProvider.jsx";
import Lobby from "@/pages/Lobby/Lobby.jsx";


const AppRouter = () => {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/" element={<Layout className="bg-[#3FC7B8]"/>}>
                        <Route path="" element={<RequireAuth><Main/></RequireAuth>}/>
                        <Route path="join_game" element={<RequireAuth><JoinGame/></RequireAuth>}/>
                        <Route path="lobby" element={<RequireAuth><Lobby/></RequireAuth>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
};

export default AppRouter;
