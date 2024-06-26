import QRCode from 'qrcode.react';
import {BASE_URL} from "@/constants/urls.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {getLobby} from "@/api/gamesCommon.js";


function createUsersHTML(users) {
    let rows = "";
    for (let i = 0; i < users.length; i++) {
        const tr = document.createElement('tr'); // Create <tr> element

        // Create first <td> column with item ID
        const td1 = document.createElement('td');
        td1.className = "border border-gray-600 px-4 py-2 bg-[#DDDEDD]";
        td1.textContent = users[i]["telegram_id"];
        tr.appendChild(td1);

        // Create second <td> column with item name
        const td2 = document.createElement('td');
        td2.className = "border border-gray-600 px-4 py-2 bg-[#DDDEDD]";
        td2.textContent = users[i]["first_name"];
        tr.appendChild(td2);

        rows += tr.outerHTML + "\n";
    }

    return rows;
}


const RequestUsers = (gameId) => {
    const [users, setUsers] = useState([]);

    setTimeout(() => {
        getLobby(gameId)
            .then((res) => {
                setUsers(res["lobby"]);
            });
        let users_el = document.getElementsByClassName("users").item(0);
        if (users_el) {
            users_el.innerHTML = createUsersHTML(users);
        }
    }, 5000);
}

export default function Lobby() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const game_id = searchParams.get("game_id");

    useEffect(() => {
        if (!game_id) {
            navigate("/");
        }
    }, [game_id, navigate]);

    RequestUsers(game_id);

    const link = BASE_URL + "/join_game?game_id=" + game_id;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
        } catch (err) { /* empty */
        }
    };

    return (
        <section className="bg-[#ED784A] space-y-10">
            <div className="mx-auto max-w-fit my-8 flex flex-row justify-around">
                <div className="qr-section">
                    <QRCode className="qr-code" size={360} includeMargin={true} value={link}/>
                    <button
                        className={classNames("m-2 bg-[#FFCD7B] self-start rounded-xl text-white", "px-8 py-2")}
                        onClick={copyToClipboard}>
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
