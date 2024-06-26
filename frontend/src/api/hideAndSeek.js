import axios from "axios";
import {BASE_URL} from "@/constants/urls.js";

const GAMES_URL = BASE_URL + '/api/games/hide-n-seek/';

const token = localStorage.getItem("token");

export const getDuration = async (gameId) => {
    const url = `${GAMES_URL}/${gameId}/durations?token=${token}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error getting duration:', error);
        throw error;
    }
}