import axios from 'axios';
import { BASE_URL } from "@/constants/urls.js";

const GAMES_URL = BASE_URL + '/api/games';

export const createGame = async ( name, duration, timeToHide, seekerPercentage) => {
    const url = `${GAMES_URL}/create?token=${localStorage.getItem("token")}`;

    const gameInfo = {
        name: name,
        data: {
            duration: duration,
            timeToHide: timeToHide,
            seekerPercentage: seekerPercentage
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

export const joinGame = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/join?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.post(url);
        console.log('Game joined:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error joining game:', error);
        throw error;
    }
}

export const leaveGame = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/leave?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.post(url);
        console.log('Game leaved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error leaving game:', error);
        throw error;
    }
}

export const getLobby = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/lobby?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);
        return {
            lobby: response.data
        };
    } catch (error) {
        console.error('Error getting lobby:', error);
        throw error;
    }
}


