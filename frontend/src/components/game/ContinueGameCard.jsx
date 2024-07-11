import classNames from "classnames";
import 'reactjs-popup/dist/index.css';
import {useNavigate} from "react-router-dom";
import {getPlayerRole, getState} from "@/api/hideAndSeek.js";

export default function ContinueGameCard({name, img, small, gameId, isHost, isActive, onClick}) {
    const navigate = useNavigate();

    async function continueToPage() {
        let state = "";
        try {
            const stateRes = await getState(gameId);
            state = stateRes?.state || "";
        } catch (e) { /* empty */
        }

        if (name === "Hide and Seek") {
            if (["no_winners", "seekers_win", "hiders_win"].includes(state)) {
                if (isHost) {
                    navigate(`/admin_results?game_id=${gameId}`);
                } else {
                    navigate(`/win?game_id=${gameId}`);
                }
            } else if (["hiding", "searching"].includes(state)) {
                if (isHost) {
                    navigate(`/admin_gameplay?game_id=${gameId}`);
                } else {
                    const roleRes = await getPlayerRole(gameId);
                    if (roleRes.role === "seeker") {
                        navigate(`/seeker?game_id=${gameId}`);
                    } else if (roleRes.role === "hider") {
                        navigate(`/hider?game_id=${gameId}`);
                    }
                }
            } else {
                if (isHost) {
                    navigate(`/lobby?game_id=${gameId}`);
                } else {
                    navigate(`/join_game?game_id=${gameId}`);
                }
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
                    onClick={continueToPage}
                >
                    Continue as {isHost ? "host" : "player"}
                </button>
            }
        </div>
    );
}
