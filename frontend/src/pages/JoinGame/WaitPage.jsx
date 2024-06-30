import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {joinGame} from "@/api/gamesCommon.js";
import {getDuration} from "@/api/hideAndSeek.js";

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
    }, []);

    joinGame(game_id);

    useEffect(() => {
        getDuration(game_id).then((result) => {
            setDuration(result["duration"]);
            setWaitTime(result["time_to_hide"]);
        });
    }, []);

    return (
        <section className="bg-[#FF7F29] space-y-10">
            <h1 className="text-xl text-white font-bold mb-2">Hide and seek</h1>

            <div
                className="my-8 mx-10 sm:mx-20 md:mx-28 lg:mx-36 text-center text-lg space-y-4 border-4 border-t-amber-400">

                <div className="flex items-center justify-between">
                    <p>Number of participants:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>not limited</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p>Game time:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>{duration} minutes</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p>Waiting time for seekers:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>{waitTime} minutes</p>
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
            </div>
        </section>
    )
};