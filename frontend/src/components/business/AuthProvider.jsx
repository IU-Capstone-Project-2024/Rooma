import React, {useState, createContext, useEffect} from 'react';
import {setToken, getToken, setTelegramId, getTelegramId, clearStorage} from '@/utils/storage.js';
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

    const signIn = (queryToken, queryTelegramId) => {
        const loginOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refresh_token: queryToken})
        }

        useEffect(
            () => {
                fetch(BASE_URL + "/api/auth/login", loginOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setToken(result["access_token"]);
                        }
                    )
            }, []
        );

        setToken(queryToken);
        setTelegramId(queryTelegramId);
        setUser({token: queryToken, telegramId: queryTelegramId});
        navigate('/');
    };

    const signOut = () => {
        clearStorage();
        setUser(null);
        navigate('/auth');
    };

    const value = {user, signIn, signOut, isAuth};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
