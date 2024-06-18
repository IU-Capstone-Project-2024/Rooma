export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setTelegramId = (telegramId) => {
    localStorage.setItem('telegramId', telegramId);
};

export const getTelegramId = () => {
    return localStorage.getItem('telegramId');
};
