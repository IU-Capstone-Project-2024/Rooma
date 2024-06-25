import { useState } from "react";
import classNames from "classnames";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import GetLink from "@/pages/Lobby/GetLink.jsx";

const convertTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
};

export default function GameCard({ name, img, small, onClick }) {
    const [game_hours, setGameHours] = useState(0);
    const [game_minutes, setGameMinutes] = useState(0);
    const [game_seconds, setGameSeconds] = useState(0);

    const [waiting_hours, setWaitingHours] = useState(0);
    const [waiting_minutes, setWaitingMinutes] = useState(0);
    const [waiting_seconds, setWaitingSeconds] = useState(0);

    const handleCreateGame = () => {
        const selectedGameTime =  `${String(game_hours).padStart(2, '0')}:${String(game_minutes).padStart(2, '0')}:${String(game_seconds).padStart(2, '0')}`;
        const selectedWaitingTime =  `${String(waiting_hours).padStart(2, '0')}:${String(waiting_minutes).padStart(2, '0')}:${String(waiting_seconds).padStart(2, '0')}`;

        const gameTimeInSeconds = convertTimeToSeconds(selectedGameTime);
        const waitingTimeInSeconds = convertTimeToSeconds(selectedWaitingTime);

        const request = {
            name: "hide and seek",
            data: {
                duration: gameTimeInSeconds,
                time_to_hide: waitingTimeInSeconds,
                seeker_percentage: 20
            }
        }

        GetLink(name, request);
    };

    return (
        <div
            className={classNames("cursor-pointer flex flex-col justify-between rounded-2xl bg-[#9CD3CD] aspect-square bg-cover border-4 border-[#9CD3CD] hover:scale-105 transition",
                small ? "h-48 md:h-56 xl:h-64" : "h-56 md:h-64 xl:h-80")}
            style={{ backgroundImage: `url(${img})` }} onClick={onClick}>
            <div className="text-center py-1 text-xl bg-[#] backdrop-brightness-75 text-white rounded-t-2xl">{name}</div>
            <Popup
                modal
                trigger={
                    <button
                        className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}>Play
                    </button>
                }
                contentStyle={{
                    maxWidth: "400px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }}
            >
                {close => (
                    <div className="text-center text-lg space-y-4">
                        <h2 className="text-xl text-[#ED7A2D] font-bold mb-2">Hide and seek</h2>

                        <div className="flex items-center justify-between">
                            <p>Number of participants:</p>
                            <div className="bg-[#FFC87A] px-2 rounded-lg">
                                <p>no limited</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Select game time:</p>
                            <div className="flex">
                                <input
                                    type="number"
                                    value={game_hours}
                                    onChange={(e) => setGameHours(Math.max(0, Math.min(23, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="hh"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    value={game_minutes}
                                    onChange={(e) => setGameMinutes(Math.max(0, Math.min(59, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="mm"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    value={game_seconds}
                                    onChange={(e) => setGameSeconds(Math.max(0, Math.min(59, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="ss"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Select time for waiting:</p>
                            <div className="flex">
                                <input
                                    type="number"
                                    value={waiting_hours}
                                    onChange={(e) => setWaitingHours(Math.max(0, Math.min(23, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="hh"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    value={waiting_minutes}
                                    onChange={(e) => setWaitingMinutes(Math.max(0, Math.min(59, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="mm"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    value={waiting_seconds}
                                    onChange={(e) => setWaitingSeconds(Math.max(0, Math.min(59, e.target.value)))}
                                    className="w-12 text-center"
                                    placeholder="ss"
                                />
                            </div>
                        </div>

                        <p className="text-left">Game Description: </p>
                        <p className="mb-4 text-left">
                            Players will be automatically divided into those who are looking and those who are hiding.
                            After the host starts the game, their role appears on the players screens. Those who are
                            hiding will have their own unique code, which needs to be said if the player is found.
                            The searching player, having found the player, must find out the code and enter it on the
                            phone so that the found person is counted.
                        </p>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={() => close()}
                        >
                            Close
                        </button>
                        <button
                            className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}
                            onClick={handleCreateGame}
                        >
                            Create Game
                        </button>
                    </div>
                )}
            </Popup>
        </div>
    );
}
