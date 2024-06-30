import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { joinGame } from "@/api/gamesCommon.js";
import { getDuration } from "@/api/hideAndSeek.js";

export default function WaitPage() {
    const [duration, setDuration] = useState(null);
    const [waitTime, setWaitTime] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const game_id = searchParams.get("game_id");

    useEffect(() => {
        if (!game_id) {
            navigate("/");
        }
    }, [game_id, navigate]);

    useEffect(() => {
        if (game_id) {
            joinGame(game_id); // Assuming joinGame handles game join logic
            getDuration(game_id).then((result) => {
                setDuration(result?.duration);
                setWaitTime(result?.time_to_hide);
            });
        }
    }, [game_id]);

    return (
        <section className="bg-[#FF7F29] my-8 flex flex-col justify-center items-center px-4 sm:px-8">
            <h1 className="text-3xl text-white font-bold mb-6">Hide and Seek Game</h1>

            <div className="bg-white rounded-xl p-6 max-w-3xl w-full mx-auto shadow-md border-4 border-[#FFC87A]">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-lg">Number of Participants:</p>
                        <div className="bg-[#FFC87A] px-3 py-1 rounded-lg">
                            <p className="font-medium">Unlimited</p>
                        </div>
                    </div>

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
                </div>

                <div className="text-lg text-gray-800">
                    <p className="mb-2">Game Description:</p>
                    <p>
                        Players will be automatically divided into seekers and hiders. The host starts the game,
                        revealing roles. Hiders receive unique codes; if found, they must reveal their code to the seeker.
                        The seeker must enter the code on their phone to count the find.
                    </p>
                </div>
            </div>
        </section>
    );
}
