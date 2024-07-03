import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '@/components/business/useAuth';
import {TG_BOT_URL} from '@/constants/urls.js';
import logo from '@/assets/logo.svg';
import telegramLogo from '@/assets/telegramLogo.svg';
import {useColor} from "@/components/layouts/ColorContext.jsx";
import {useEffect} from "react";

const Auth = () => {
    const location = useLocation();
    const fromPage = location.state?.from || '/';
    const gameId = location.state?.gameId;

    const {isAuth} = useAuth();

    if (isAuth()) {
        return <Navigate to={fromPage} replace={true}/>
    }

    const telegramBotLink = `${TG_BOT_URL}?start=${gameId ? gameId : 'create_game'}`;

    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

    useEffect(() => {
        setHeaderColor('#3FC7B8');
        setFooterColor('#3FC7B8');
        setBackgroundColor('#3FC7B8');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#3FC7B8]">
            <div className="flex items-center mb-8">
                <img src={logo} alt="Rooma" className="h-16"/>
                <h1 className="text-6xl font-bold text-white ml-4">Rooma</h1>
            </div>
            <a href={telegramBotLink} target="_blank" rel="noopener noreferrer">
                <button
                    className="flex items-center px-10 py-6 text-xl bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none">
                    <img src={telegramLogo} alt="Telegram Logo" className="h-8 w-8 mr-4"/>
                    Authorize in Telegram Bot
                </button>
            </a>
        </div>
    );
};

export default Auth;
