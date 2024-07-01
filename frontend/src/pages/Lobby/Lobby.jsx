import QRCode from 'qrcode.react';
import { BASE_URL } from "@/constants/urls.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { getLobby } from "@/api/gamesCommon.js";
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";

const ROW_COUNT = 8;

function createUsersHTML(users) {
    let rows = "";
    for (let i = 0; i < ROW_COUNT; i++) {
        const tr = document.createElement('tr');

        const td0 = document.createElement('td');
        td0.className = "border border-gray-600 px-4 py-2 bg-white";
        td0.textContent = i + 1;
        tr.appendChild(td0);

        const td1 = document.createElement('td');
        td1.className = "border border-gray-600 px-4 py-2 bg-white";
        td1.textContent = users[i]?.telegram_id || '';
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.className = "border border-gray-600 px-4 py-2 bg-white";
        td2.textContent = users[i]?.first_name || '';
        tr.appendChild(td2);

        rows += tr.outerHTML + "\n";
    }

    return rows;
}

const RequestUsers = (gameId) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getLobby(gameId)
                .then((res) => {
                    setUsers(res["lobby"]);
                });

            let users_el = document.getElementsByClassName("users").item(0);
            if (users_el) {
                users_el.innerHTML = createUsersHTML(users);
            }
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [gameId, users]);
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
        } catch (err) { /* empty */ }
    };

    return (
        <section className="relative bg-[#FF7F29] space-y-10 flex flex-col items-center justify-around">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl md:text-6xl font-bold text-white my-8">Hide and seek</h1>

            <div className="max-w-fit my-4 flex flex-col md:flex-row z-10">
                <div className="flex flex-col items-center mx-4 md:mx-16">
                    <QRCode className="qr-code mb-4 md:mb-8" size={280} includeMargin={true} value={link} />
                    <button
                        className={classNames("bg-[#FFCD7B] rounded-xl text-white px-8 py-2")}
                        onClick={copyToClipboard}>
                        Copy link
                    </button>
                </div>

                <div className="flex flex-col items-center mx-4 md:mx-16 mt-8 md:mt-0">
                    <table className="table-auto border-collapse border border-gray-800 w-full">
                        <thead>
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 bg-gray-200">#</th>
                            <th className="border border-gray-600 px-4 py-2 bg-gray-200">Telegram ID</th>
                            <th className="border border-gray-600 px-4 py-2 bg-gray-200">First Name</th>
                        </tr>
                        </thead>
                        <tbody className="users h-80 overflow-y-auto">
                        </tbody>
                    </table>

                    <button
                        className={classNames("m-2 bg-[#FFCD7B] rounded-xl text-white px-8 py-2 mt-4 md:mt-8")}>
                        Play
                    </button>
                </div>
            </div>
        </section>
    );
};
