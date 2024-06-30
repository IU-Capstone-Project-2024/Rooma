import axios from 'axios';
import {BASE_URL} from "@/constants/urls.js";

const GAMES_URL = BASE_URL + '/api/games';

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
        return response.data;
    } catch (error) {
        console.error('Error getting lobby:', error);
        throw error;
    }
}


