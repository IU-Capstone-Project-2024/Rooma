import axios from "axios";
import {BASE_URL} from "@/constants/urls.js";

const GAMES_URL = BASE_URL + '/api/games/hide-n-seek';

export const createGame = async ( name, duration, timeToHide, seekerPercentage) => {
    const url = `${GAMES_URL}/create?token=${localStorage.getItem("token")}`;

    const gameInfo = {
        name: name,
        data: {
            duration: duration,
            time_to_hide: timeToHide,
            seeker_percentage: seekerPercentage
        }
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

export const getDuration = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/durations?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error getting duration:', error);
        throw error;
    }
}