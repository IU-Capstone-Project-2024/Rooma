import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import clock from "@/assets/hideAndSeek/clock.svg";
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";
import {getDuration, getHiderResults, getSeekerResults, getState} from "@/api/hideAndSeek.js";
import {useColor} from "@/components/layouts/ColorContext.jsx";
import {useInterval} from "@/utils/UseInterval.jsx";
import {finishGame} from "@/api/gamesCommon.js";
import HiderSeekerTable from "@/pages/GameOver/HiderSeekerTable.jsx";


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
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    useEffect(() => {
        if (!gameId) {
            navigate("/", {replace: true});
        }
    }, [gameId, navigate]);

    // get duration and update the timer
    useEffect(() => {
        const fetchDuration = async () => {
            const res = await getDuration(gameId);
            const duration = Number(res["duration"]);

            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;

            setHours(hours);
            setMinutes(minutes);
            setSeconds(0);
        }

        fetchDuration();
    }, [gameId]);

    const moveAfterFinish = () => {
        navigate(`/admin_results?game_id=${gameId}`);
    };

    const prematureFinishGame = () => {
        finishGame(gameId);
        moveAfterFinish();
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

        if (stateRes["state"] === "seekers_win" || stateRes["state"] === "hiders_win") {
            moveAfterFinish();
        }
    }, 5000);

    // refresh timer
    useInterval(() => {
        setSeconds(prevSeconds => {
            if (prevSeconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        moveAfterFinish();
                        return 0;
                    }
                    setHours(prevHours => prevHours - 1);
                    setMinutes(59);
                    return 59;
                }
                setMinutes(prevMinutes => prevMinutes - 1);
                return 59;
            }
            return prevSeconds - 1;
        });
    }, 1000);

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
                    <div className="relative w-1/2">
                        <img src={clock} alt="clock" className="w-full h-auto max-w-xs mx-auto"/>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-2xl md:text-3xl">
                                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-[#FFCD7B] text-black font-bold rounded"
                            onClick={prematureFinishGame}>
                        Finish game
                    </button>
                </div>
            </div>
        </section>
    );
}
