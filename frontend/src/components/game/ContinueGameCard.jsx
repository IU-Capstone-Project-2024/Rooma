import classNames from "classnames";
import 'reactjs-popup/dist/index.css';
import {useNavigate} from "react-router-dom";
import {getState} from "@/api/hideAndSeek.js";

export default function ContinueGameCard({name, img, small, gameId, isHost, isActive, onClick}) {
    const navigate = useNavigate();

    async function navigateToContinue() {
        const state = (await getState(gameId))["state"];
        console.log(state);
        if (name === "Hide and Seek") {
            if (isHost === true) {

            } else {

            }
        }
    }

    return (
        <div
            className={
                classNames(
                    "cursor-pointer flex flex-col justify-between rounded-2xl bg-[#9CD3CD]",
                    "aspect-square bg-cover border-4 border-[#9CD3CD] hover:scale-105 transition",
                    small ? "h-48 md:h-56 xl:h-64" : "h-56 md:h-64 xl:h-80"
                )
            }
            style={
                {backgroundImage: `linear-gradient(rgba(0, 0, 0, ${isActive ? 0 : 0.5}), rgba(0, 0, 0, ${isActive ? 0 : 0.5})),url(${img})`}
            }
            onClick={onClick}>
            <div
                className="text-center py-1 text-xl bg-[#] backdrop-brightness-75 text-white rounded-t-2xl select-none">
                {name}
            </div>
            {
                <button
                    className={classNames(
                        "m-2 self-start rounded-xl text-white",
                        small ? "px-6 py-1" : "px-8 py-2",
                        "bg-gradient-to-r from-yellow-400 to-pink-500",
                    )}
                    onClick={navigateToContinue}
                >
                    Continue as {isHost ? "host" : "player"}
                </button>
            }
        </div>
    );
}
