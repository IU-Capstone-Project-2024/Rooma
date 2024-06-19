import WaitPage from "@/pages/JoinGame/WaitPage.jsx";
import {root} from "@/main.jsx";

function requestJoinGame(token, telegramId, gameId) {
    // TODO: add states etc. to prevent double execution
    // TODO: check if token and telegram id do not exist

    fetch('http://rooma-games.duckdns.org/bridge/join?token=' + token + '&telegram_id=' + telegramId + '&game_id=' + gameId, {
        method: 'PUT',
    }).then(data => {
    })
}


export default function JoinGame() {
    // TODO: add states etc. to prevent double execution

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const queryToken = params.get('token');
    const queryTelegramId = params.get('telegram_id');
    const queryGameId = params.get('game_id');

    requestJoinGame(queryToken, queryTelegramId, queryGameId);

    return root.render(<WaitPage/>);
};

