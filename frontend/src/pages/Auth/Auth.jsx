import React from 'react';
import {useEffect} from 'react';
import {getTelegramId, getToken, setTelegramId, setToken} from '@/utils/storage.js';
import App from "@/App.jsx";
import {BASE_URL, TG_BOT_URL} from "../../constants/urls.js";


const button_style = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0088cc', // Telegram's primary color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};


export default function Auth() {
    // TODO: add states etc. to prevent double execution

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const queryToken = params.get('token');
    const queryTelegramId = params.get('telegram_id');

    let token = getToken();
    let telegramId = getTelegramId();

    if ((!token || !telegramId) && (!queryToken || !queryTelegramId)) {
        const telegramBotLink = TG_BOT_URL + '?start=create_game';

        return (
            <a href={telegramBotLink} target="_blank" rel="noopener noreferrer">
                <button style={button_style}>Authorize in Telegram Bot</button>
            </a>
        );
    } else if (queryToken && queryTelegramId) {
        console.log(1, queryToken, queryTelegramId, token, telegramId);

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
                            console.log(result);
                            setToken(result["access_token"]);
                        }
                    )
            }, []
        );

        setToken(queryToken);
        setTelegramId(queryTelegramId);
    }

    token = getToken();
    telegramId = getTelegramId();

    console.log(2, queryToken, queryTelegramId, token, telegramId);

    // window.history.pushState({}, '', window.location.pathname);

    return <App/>
};

