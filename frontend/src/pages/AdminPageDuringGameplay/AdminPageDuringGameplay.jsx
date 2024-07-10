import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";
import {getEndTimes, getHiderResults, getSeekerResults, getState} from "@/api/hideAndSeek.js";
import {useColor} from "@/components/layouts/ColorContext.jsx";
import {useInterval} from "@/utils/UseInterval.jsx";
import {finishGame} from "@/api/gamesCommon.js";
import HiderSeekerTable from "@/pages/GameOver/HiderSeekerTable.jsx";
import GameTimer from "@/components/game/GameTimer.jsx";


export default function AdminPageDuringGameplay() {
    const {setHeaderColor, setFooterColor, setBackgroundColor} = useColor();

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    const [searchParams] = useSearchParams();
    const [hiderResults, setHiderResults] = useState([]);
    const [seekerResults, setSeekerResults] = useState([]);
    const [activeButton, setActiveButton] = useState('hiders');
    const [finishButton, setFinishButton] = useState("Finish game");

    const [endTime, setEndTime] = useState(new Date());

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    useEffect(() => {
        if (!gameId) {
            navigate("/");
        }
    }, [gameId, navigate]);

    // get duration and update the timer
    useEffect(() => {
        setTimeout(
            () => {
                getEndTimes(gameId).then((res) => {
                    setEndTime(new Date(res["game_end_time"] + "Z"));
                });
            }, 1000
        )
    }, [gameId]);

    const moveAfterFinish = () => {
        navigate(`/admin_results?game_id=${gameId}`);
    };

    const prematureFinish = () => {
        finishGame(gameId);
        setFinishButton("Waiting...");
    };

    // refresh data about players
    useInterval(async () => {
        const [seekerRes, hiderRes, stateRes] = await Promise.all([
            getSeekerResults(gameId),
            getHiderResults(gameId),
            getState(gameId)
        ]);

        setSeekerResults(seekerRes);
        setHiderResults(hiderRes);

        if (["seekers_win", "hiders_win", "no_winners"].includes(stateRes["state"])) {
            moveAfterFinish();
        }
    }, 5000);

    return (
        <section className="relative flex flex-col items-center justify-center bg-[#FF7F29]">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl text-white font-bold mb-8 z-10">Hide and Seek</h1>
            <div className="flex flex-col sm:flex-row w-full sm:w-3/4 h-full sm:h-auto z-10">
                <HiderSeekerTable
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    hiderResults={hiderResults}
                    seekerResults={seekerResults}
                />
                <div className="sm:w-1/2 p-4 flex flex-col items-center justify-center">
                    <GameTimer endTime={endTime}/>
                    <button className="mt-4 px-6 py-3 bg-[#FFCD7B] text-black font-bold rounded"
                            onClick={prematureFinish}>
                        {finishButton}
                    </button>
                </div>
            </div>
        </section>
    );
}
