import axios from 'axios';
import { BASE_URL } from "@/constants/urls.js";

const GAMES_URL = BASE_URL + '/api/games/';

export const createGame = async (token, gameId, ownerTelegramId, isActive, name, lobby, data) => {
    const url = `${GAMES_URL}create?token=${token}`;

    const gameInfo = {
        game_id: gameId,
        owner_telegram_id: ownerTelegramId,
        is_active: isActive,
        name: name,
        lobby: lobby,
        data: data,
    };

    try {
        const response = await axios.post(url, gameInfo);
        console.log('Game created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error; // Пробрасываем ошибку дальше, если нужно обработать в другом месте
    }
};
