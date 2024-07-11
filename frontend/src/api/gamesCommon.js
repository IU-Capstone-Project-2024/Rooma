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

export const getRules = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/rules?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error getting rules:', error);
        throw error;
    }
}

export const startGame = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/start?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Error starting game:', error);
        throw error;
    }
}

export const finishGame = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/finish?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Error finishing game:', error);
        throw error;
    }
}

export const listGames = async () => {
    const url = `${GAMES_URL}/list-games?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error getting list of games:', error);
        throw error;
    }
}

export const listPopular = async () => {
    const url = `${GAMES_URL}/list-popular?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);

        // rename _id to name
        return response.data.map(obj => {
            const {_id, ...rest} = obj;  // Destructure _id and the rest of the object
            return {name: _id, ...rest}; // Create a new object with name and the rest of the original object
        });
    } catch (error) {
        console.error('Error getting list of popular:', error);
        throw error;
    }
}


export const postFeedback = async (gameId, score, feedback) => {
    const url = `${GAMES_URL}/${gameId}/feedback?token=${localStorage.getItem("token")}`;

    const feedbackPayload = {
        score: score,
        feedback: feedback
    };

    try {
        const response = await axios.post(url, feedbackPayload);
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
}

export const getGeneralFeedback = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/feedback?token=${localStorage.getItem("token")}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error getting feedback:', error);
        throw error;
    }
}