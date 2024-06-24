import {getTelegramId, getToken} from "@/utils/storage.js";
import Lobby from "@/pages/Lobby/Lobby.jsx";
import {root} from "@/main.jsx";
import {BASE_URL} from "../../constants/urls.js";


async function getLink(name) {
    // TODO: add states etc. to prevent double execution
    // TODO: check if token and telegram id do not exist

    let token = getToken();
    let telegramId = getTelegramId();

    const postData = {
        name: name,
        data: 'placeholder',
    };

    let response = await fetch(BASE_URL + '/api/bridge/game?token=' + token + '&telegram_id=' + telegramId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    let jsonResponse = await response.json();
    return jsonResponse["link"];
}


export default async function GetLink(name) {
    let link = await getLink(name);

    root.render(<Lobby link={link}/>);
}