import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {getRules, joinGame, leaveGame} from "@/api/gamesCommon.js";
import { getDuration } from "@/api/hideAndSeek.js";
import {useColor} from "@/components/layouts/ColorContext.jsx";

export default function WaitPage() {
    const [duration, setDuration] = useState(null);
    const [waitTime, setWaitTime] = useState(null);
    const [rules, setRules] = useState(null);
    const [note, setNote] = useState(null);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const game_id = searchParams.get("game_id");

    const leaveGameByButton = () => {
        // Assuming leaveGame handles game leave logic
        navigate("/", {replace: true});
        leaveGame(game_id);
    }

    useEffect(() => {
        if (!game_id) {
            navigate("/", {replace: true});
        }
    }, [game_id, navigate]);

    useEffect(() => {
        if (game_id) {
            joinGame(game_id); // Assuming joinGame handles game join logic
            getDuration(game_id).then((result) => {
                setDuration(result?.duration);
                setWaitTime(result?.time_to_hide);
            });
            getRules(game_id).then((result) => {
                setRules(result?.rules);
                setNote(result?.note);
            });
        }
    }, [game_id]);

    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    return (
        <section className="my-8 flex flex-col justify-center items-center px-4 sm:px-8">
            <h1 className="text-3xl text-white font-bold mb-6">Hide and Seek Game</h1>

            <div className="bg-white rounded-xl p-6 max-w-3xl w-full mx-auto shadow-md border-4 border-[#FFC87A]">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-lg">Number of Participants:</p>
                        <div className="bg-[#FFC87A] px-3 py-1 rounded-lg">
                            <p className="font-medium">Unlimited</p>
                        </div>
                    </div>

                    <div className="text-lg text-gray-800">
                        <p className="mb-2">Rules of the game:</p>
                        <p>{rules}</p>
                    </div>

                    {
                        note && (
                            <div className="text-lg text-gray-800">
                                <p className="mb-2">Game master comment:</p>
                                <p className="bg-[#FFC87A] px-3 py-1 rounded-lg" style={{whiteSpace: "pre-wrap"}}>{note}</p>
                            </div>
                        )
                    }

                    <div className="flex items-center justify-between mb-4">
                        <p className="text-lg">Game Duration:</p>
                        <div className="bg-[#FFC87A] px-3 py-1 rounded-lg">
                            <p className="font-medium">{duration} minutes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-lg">Wait Time for Seekers:</p>
                        <div className="bg-[#FFC87A] px-3 py-1 rounded-lg">
                            <p className="font-medium">{waitTime} minutes</p>
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-[#FF7F29] text-white font-bold py-2 px-4 rounded-lg"
                        onClick={leaveGameByButton}>Leave the Game</button>
                </div>
            </div>
        </section>
    );
}
