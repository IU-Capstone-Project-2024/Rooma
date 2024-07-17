import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {getEndTimes, getHiderCode} from "@/api/hideAndSeek.js";
import {useColor} from "@/components/layouts/ColorContext.jsx";
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";
import GameTimer from "@/components/game/GameTimer.jsx";
import {getState} from "@/api/hideAndSeek.js";
import {useInterval} from "@/utils/UseInterval.jsx";
import QRCode from "qrcode.react";

export default function HiderPage() {
    const [hiderCode, setHiderCode] = useState(null);
    const [gameEndTime, setGameEndTime] = useState(null);
    const [searchParams] = useSearchParams();
    const [gameState, setGameState] = useState(null);

    const navigate = useNavigate();

    const game_id = searchParams.get("game_id");

    useEffect(() => {
        if (!game_id) {
            navigate("/");
        }
    }, [game_id, navigate]);

    useEffect(() => {
        if (game_id) {
            getEndTimes(game_id).then((res) => {
                setGameEndTime(new Date(res["game_end_time"] + "Z"));
            });
            getHiderCode(game_id).then((result) => {
                setHiderCode(result?.code);
            });
        }
    }, [game_id]);

    useInterval(() => {
        getState(game_id)
            .then((res) => {
                setGameState(res.state);
                console.log(gameState);
            });
    }, 2000);

    if (gameState === 'hiders_win' || gameState === 'seekers_win' || gameState === 'no_winners') {
        navigate("/win?game_id=" + game_id);
    }

    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    return (
        <section className="relative flex flex-col items-center justify-center bg-[#FF7F29]">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl text-white font-bold mb-8 z-10">Hide and Seek</h1>
            <h2 className="text-2xl text-white font-bold mb-8 z-10">
                You are
                <span className="bg-[#FFC87A] text-black px-2 py-1 rounded ml-2">
                    hiding
                </span>
            </h2>

            <h2 className="text-2xl text-white font-bold mb-8 z-10">
                Your code:
                <span className="bg-[#FFC87A] text-black px-2 py-1 rounded ml-2">
                    {hiderCode}
                </span>
            </h2>

            {hiderCode && (
                <div className="mb-8 z-10">
                    <QRCode lassName="qr-code mb-4 md:mb-8" size={150} includeMargin={true} value={hiderCode}/>
                </div>
            )}

            <GameTimer endTime={gameEndTime} />
        </section>
    );
}
