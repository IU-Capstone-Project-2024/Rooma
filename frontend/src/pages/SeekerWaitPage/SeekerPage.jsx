import steps_1 from "@/assets/hideAndSeek/steps_1.svg";
import {useColor} from "@/components/layouts/ColorContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {find, getDuration, getEndTimes} from "@/api/hideAndSeek.js";
import GameTimer from "@/components/game/GameTimer.jsx";

export default function SeekerPage() {
    const {setHeaderColor, setFooterColor, setBackgroundColor} = useColor();

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    const [searchParams] = useSearchParams();
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [hideTime, setHideTime] = useState(0);

    const [seekerStartTime, setSeekerStartTime] = useState(null);
    const [gameEndTime, setGameEndTime] = useState(null);

    const [isStarted, setIsStarted] = useState(false);

    const [codeToSubmit, setCodeToSubmit] = useState("");

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    const sendRequestToFind = async () => {
        await find(gameId, codeToSubmit)
    }

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
            const timeToHide = Number(res["time_to_hide"]);

            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            getEndTimes(gameId).then((res) => {
                setGameEndTime(new Date(res["game_end_time"] + "Z"));
                setSeekerStartTime(new Date(res["seeker_start_time"] + "Z"));
            });

            setHours(hours);
            setMinutes(minutes);
            setHideTime(timeToHide);
        }

        fetchDuration();
    }, [gameId]);

    return (
        <section className="relative flex flex-col items-center justify-center">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl text-white font-bold mb-8 z-10">Hide and Seek</h1>
            <h2 className="text-2xl text-white font-bold mb-8 z-10">
                You are
                <span className="bg-[#FFC87A] text-black px-2 py-1 rounded ml-2">
                    seeking
                </span>
            </h2>

            <div className="text-xl text-white z-10">
                <p>Game Duration: {hours} hours {minutes} minutes</p>
            </div>

            {
                new Date() > seekerStartTime && (
                    <div>
                        <h2 className="text-2xl text-white font-bold mb-8 z-10">You can start seeking now!</h2>;
                        <GameTimer endTime={gameEndTime} />

                        <textarea
                            className="w-80 h-40 bg-white rounded-lg p-2 text-black"
                            placeholder="Enter the code here"
                            onChange={(e) => setCodeToSubmit(e.target.value)}
                        />

                        <button className="bg-[#FFC87A] text-black px-4 py-2 rounded-lg mt-4" onClick={sendRequestToFind}>
                            Submit
                        </button>
                    </div>
                )
            }


            {new Date() < seekerStartTime && <h2 className="text-2xl text-white font-bold mb-8 z-10">The game will start soon!</h2>}
            {new Date() < seekerStartTime && <GameTimer endTime={seekerStartTime} frozen={true} />}

        </section>
    );
}
