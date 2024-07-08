import React, {createContext, useState} from 'react';
import {clearStorage, getTelegramId, getToken, setTelegramId, setToken} from '@/utils/storage.js';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "@/components/business/useAuth.js";
import {BASE_URL} from "@/constants/urls.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const initialToken = getToken();
    const initialTelegramId = getTelegramId();

    const initialState = (initialToken && initialTelegramId)
        ? {token: initialToken, telegramId: initialTelegramId} : null;

    const [user, setUser] = useState(initialState);

    const isAuth = () => {
        const {user} = useAuth();
        return user;
    }

    const signIn = async (queryRefreshToken, queryTelegramId) => {
        const loginOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refresh_token: queryRefreshToken})
        }

        const res = await fetch(BASE_URL + "/api/auth/login", loginOptions);
        const result = await res.json();

        setTelegramId(queryTelegramId);
        setToken(result["access_token"]);

        setUser({token: result["access_token"], telegramId: queryTelegramId});
    };

    const signOut = () => {
        clearStorage();
        setUser(null);
        navigate('/auth');
    };

    const value = {user, signIn, signOut, isAuth};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
