import QRCode from 'qrcode.react';
import {getTelegramId, getToken} from "@/utils/storage.js";
import {BASE_URL} from "@/constants/urls.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import classNames from "classnames";

async function requestUsers(gameId) {
    // TODO: add states etc. to prevent double execution
    // TODO: check if token and telegram id do not exist

    let token = getToken();
    let telegramId = getTelegramId();

    let response = await fetch(BASE_URL + '/api/bridge/users?token=' + token + '&telegram_id=' + telegramId + '&game_id=' + gameId, {
        method: 'GET'
    });
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

export default function Lobby() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const game_id = searchParams.get("game_id");

    useEffect(() => {
        if (!game_id) {
            navigate("/");
        } else {
            requestUsers(game_id);
        }
    }, [game_id]);

    const link = BASE_URL + "/join_game?game_id=" + game_id;

    return (
        <section className="bg-[#ED784A] space-y-10">
            <div className="mx-auto max-w-fit my-8 flex flex-row justify-around">
                <div className="qr-section">
                    <QRCode className="qr-code" size={360} includeMargin={true} value={link}/>
                    <button
                        className={classNames("m-2 bg-[#FFCD7B] self-start rounded-xl text-white", "px-8 py-2")}>
                        Copy link
                    </button>
                </div>

                <div className="flex flex-col">
                    <table className="table-auto border-collapse border border-gray-800 w-full">
                        <thead>
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 bg-gray-200">Telegram ID</th>
                            <th className="border border-gray-600 px-4 py-2 bg-gray-200">First Name</th>
                        </tr>
                        </thead>
                        <tbody className="users">
                        <tr>
                            <td className="border border-gray-600 px-4 py-2">12345678</td>
                            <td className="border border-gray-600 px-4 py-2">John Doe</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-600 px-4 py-2">87654321</td>
                            <td className="border border-gray-600 px-4 py-2">Jane Smith</td>
                        </tr>
                        {/* Sample data for illustration */}
                        </tbody>
                    </table>

                    <button
                        className={classNames("m-2 bg-[#FFCD7B] self-start rounded-xl text-white", "px-8 py-2")}>
                        Play
                    </button>
                </div>
            </div>
        </section>
    );
};
