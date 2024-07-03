import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "@/components/business/useAuth";
import {useLocation} from "react-router-dom";

const RequireAuth = ({children}) => {
    const {isAuth, signIn} = useAuth();
    const location = useLocation();

    if (isAuth()) {
        return children;
    }

    const params = new URLSearchParams(location.search);
    const queryToken = params.get('token');
    const queryTelegramId = params.get('telegram_id');
    const gameId = params.get('game_id');

    if (queryToken && queryTelegramId) {
        signIn(queryToken, queryTelegramId);
    }

    if (!isAuth()) {
        return <Navigate to="/auth" state={{ from: location, gameId: gameId }} />;
    }

    return children;
};

export default RequireAuth;
