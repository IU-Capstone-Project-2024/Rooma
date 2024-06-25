import {Navigate} from 'react-router-dom';
import {useAuth} from '@/components/business/useAuth';
import {TG_BOT_URL} from '@/constants/urls.js';

const Auth = () => {
    const {isAuth} = useAuth();

    if (isAuth()) {
        return <Navigate to="/"/>;
    }

    const telegramBotLink = `${TG_BOT_URL}?start=create_game`;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <a href={telegramBotLink} target="_blank" rel="noopener noreferrer">
                <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#0088cc',
                    color: 'white', border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Authorize via Telegram Bot
                </button>
            </a>
        </div>
    );
};

export default Auth;
