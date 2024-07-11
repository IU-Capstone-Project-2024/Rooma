// AppRouter.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layouts/Layout.jsx';
import Main from '@/pages/Main/Main.jsx';
import NotFound from '@/pages/NotFound/NotFound.jsx';
import Auth from '@/pages/Auth/Auth.jsx';
import RequireAuth from '@/components/business/RequireAuth.jsx';
import { AuthProvider } from '@/components/business/AuthProvider.jsx';
import Lobby from '@/pages/Lobby/Lobby.jsx';
import WaitPage from '@/pages/JoinGame/WaitPage.jsx';
import WinningTeam from '@/pages/GameOver/WinningTeam.jsx';
import { ColorProvider} from '@/components/layouts/ColorContext.jsx';
import AdminPageDuringGameplay from "@/pages/AdminPageDuringGameplay/AdminPageDuringGameplay.jsx";
import SeekerPage from "@/pages/SeekerWaitPage/SeekerPage.jsx";
import AdminResults from "@/pages/GameOver/AdminResults.jsx";
import HiderPage from "@/pages/HiderPage/HiderPage.jsx";
import AdminFeedback from "@/pages/AdminFeedback/AdminFeedback.jsx";

const AppRouter = () => {
    return (
        <AuthProvider>
            <ColorProvider>
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<RequireAuth><Main /></RequireAuth>} />
                        <Route path="join_game" element={<RequireAuth><WaitPage /></RequireAuth>} />
                        <Route path="lobby" element={<RequireAuth><Lobby /></RequireAuth>} />
                        <Route path="admin_gameplay" element={<RequireAuth><AdminPageDuringGameplay/></RequireAuth>}/>
                        <Route path="admin_results" element={<RequireAuth><AdminResults/></RequireAuth>}/>
                        <Route path="win" element={<RequireAuth><WinningTeam /></RequireAuth>} />
                        <Route path="seeker" element={<RequireAuth><SeekerPage /></RequireAuth>} />
                        <Route path="hider" element={<RequireAuth><HiderPage /></RequireAuth>} />
                        <Route path="admin_feedback" element={<RequireAuth><AdminFeedback /></RequireAuth>} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ColorProvider>
        </AuthProvider>
    );
};

export default AppRouter;
