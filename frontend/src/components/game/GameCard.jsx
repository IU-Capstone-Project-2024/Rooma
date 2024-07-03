import {useState} from "react";
import classNames from "classnames";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {createGame} from "@/api/hideAndSeek.js";
import {useNavigate} from "react-router-dom";

const GAME_DETAILS = new Map([
    ["Hide and Seek", {
        participants: "not limited",
        gameTime: true,
        waitingTime: true,
        description: "Players will be automatically divided into those who are looking and those who are hiding. " +
            "After the host starts the game, their role appears on the players screens." +
            "Those who are hiding will have their own unique code, which needs to be said if the player is found." +
            "The searching player, having found the player, must find out the code and enter it on the phone so that the found person is counted."
    }],
]);

const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60) + minutes;
};

export default function GameCard({name, img, small, onClick}) {
    console.log(GAME_DETAILS.get(name), name, GAME_DETAILS)
    const [game_hours, setGameHours] = useState(0);
    const [game_minutes, setGameMinutes] = useState(0);

    const [waiting_hours, setWaitingHours] = useState(0);
    const [waiting_minutes, setWaitingMinutes] = useState(0);

    const [comment, setComment] = useState("")

    const navigate = useNavigate();

    const handleCreateGame = () => {
        const selectedGameTime = `${game_hours.toString().padStart(2, '0')}:${game_minutes.toString().padStart(2, '0')}`;
        const selectedWaitingTime = `${waiting_hours.toString().padStart(2, '0')}:${waiting_minutes.toString().padStart(2, '0')}`;

        const gameTimeInMinutes = convertTimeToMinutes(selectedGameTime);
        const waitingTimeInMinutes = convertTimeToMinutes(selectedWaitingTime);

        createGame(name, Number(gameTimeInMinutes), Number(waitingTimeInMinutes), 20, comment)
            .then((res) => {
                navigate("/lobby?game_id=" + res["game_id"]);
            });
    };

    return (
        <div
            className={classNames("cursor-pointer flex flex-col justify-between rounded-2xl bg-[#9CD3CD] aspect-square bg-cover border-4 border-[#9CD3CD] hover:scale-105 transition",
                small ? "h-48 md:h-56 xl:h-64" : "h-56 md:h-64 xl:h-80")}
            style={{backgroundImage: `url(${img})`}} onClick={onClick}>
            <div
                className="text-center py-1 text-xl bg-[#] backdrop-brightness-75 text-white rounded-t-2xl select-none">{name}</div>
            <Popup
                modal
                trigger={
                    <button
                        className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}>Play
                    </button>
                }
                contentStyle={{
                    maxWidth: "400px",
                    minWidth: "60%",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }}
            >
                {close => (
                    <>
                        <button
                            className="absolute top-1 m-0 right-1 px-4 py-2 text-xl"
                            onClick={() => close()}
                        >
                            ×
                        </button>
                        <div className="text-center text-lg space-y-4">
                            <h2 className="text-xl text-[#ED7A2D] font-bold mb-2">{name}</h2>

                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <p>Number of participants:</p>
                                <div className="bg-[#FFC87A] px-2 rounded-lg">
                                    <p>not limited</p>
                                </div>
                            </div>

                            {GAME_DETAILS.get(name)?.gameTime &&
                                <div className="flex flex-col md:flex-row justify-between">
                                    <p className="text-left">Select game time (hours/minutes):</p>
                                    <div className="flex justify-center items-center">
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
                                    </div>
                                </div>
                            }

                            {GAME_DETAILS.get(name)?.waitingTime &&
                                <div className="flex flex-col md:flex-row justify-between">
                                    <p className="text-left">Select time for waiting (hours/minutes):</p>
                                    <div className="flex justify-center items-center">
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
                                    </div>
                                </div>
                            }

                            <p className="text-left">Game Description:</p>
                            <p className="mb-4 text-left">{GAME_DETAILS.get(name)?.description}</p>

                            <h3 className="text-lg text-[#ED7A2D] font-bold">Comment for players:</h3>
                            <textarea
                                className="w-full h-24 p-2 border-2 border-[#FFC87A] rounded-xl"
                                placeholder="Enter your comment here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            <button
                                className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}
                                onClick={handleCreateGame}
                            >
                                Create Game
                            </button>
                        </div>
                    </>
                )}
            </Popup>
        </div>
    );
}
