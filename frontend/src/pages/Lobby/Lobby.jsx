import QRCode from 'qrcode.react';
import {getTelegramId, getToken} from "@/utils/storage.js";

async function requestUsers(gameId) {
    // TODO: add states etc. to prevent double execution
    // TODO: check if token and telegram id do not exist

    let token = getToken();
    let telegramId = getTelegramId();

    let response = await fetch('http://rooma-games.duckdns.org/bridge/users?token=' + token + '&telegram_id=' + telegramId + '&game_id=' + gameId, {
        method: 'GET'
    })
    let users = await response.json();
    let rows = "";
    for (let i = 0; i < users.length; i++) {
        const tr = document.createElement('tr'); // Create <tr> element

        // Create first <td> column with item ID
        const td1 = document.createElement('td');
        td1.textContent = users[i]["telegram_id"];
        tr.appendChild(td1); // Append td1 to tr

        // Create second <td> column with item name
        const td2 = document.createElement('td');
        td2.textContent = users[i]["first_name"];
        tr.appendChild(td2); // Append td2 to tr

        rows += tr.outerHTML + "\n";
    }
    document.getElementsByClassName("users").item(0).innerHTML = rows;

    // return jsonResponse["link"];
    await new Promise(resolve => {
        setTimeout(resolve, 1000, gameId)
    }).then(() => {
        return requestUsers(gameId)
    });
}


export default function Lobby(props) {
    requestUsers(props.link.toString().split("start=").at(1)).then(r => {
    });
    return (
        <>
            <div style={{margin: 'auto auto auto auto', maxWidth: 'fit-content'}}>
                <a href={props.link} style={{fontSize: '5em'}}>PRESS ME</a>
                <br/>
                <br/>
                <br/>
                <QRCode size={360} value={props.link}/>
                <br/>
                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>Telegram ID</th>
                        <th>First Name</th>
                    </tr>
                    </thead>
                    <tbody className="users">
                    </tbody>
                </table>
            </div>
        </>
    );
};
