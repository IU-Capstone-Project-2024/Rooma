import steps_1 from "@/assets/hideAndSeek/steps_1.svg";
import { useColor } from "@/components/layouts/ColorContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { find, getDuration, getEndTimes, getState } from "@/api/hideAndSeek.js";
import GameTimer from "@/components/game/GameTimer.jsx";
import { useInterval } from "@/utils/UseInterval.jsx";
import { Html5Qrcode } from "html5-qrcode";

export default function SeekerPage() {
    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

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

    const [codeToSubmit, setCodeToSubmit] = useState("");

    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    const sendRequestToFind = async (code) => {
        // if successful find then alert message that find is successful
        await find(gameId, code || codeToSubmit)
            .then((res) => {
                if (res["status"] === "success") {
                    alert("You have found the hider!");
                } else {
                    alert("You have not found the hider!");
                }
            });
    }

    const updateDate = () => {
        setDate(new Date());
    }

    useEffect(() => {
        if (!gameId) {
            navigate("/");
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

    const [gameState, setGameState] = useState(null);

    useInterval(() => {
        getState(gameId)
            .then((res) => {
                setGameState(res.state);
                console.log(gameState);
            });
    }, 2000);

    if (gameState === 'hiders_win' || gameState === 'seekers_win' || gameState === 'no_winners') {
        navigate("/win?game_id=" + gameId);
    }

    const [isEnabled, setEnabled] = useState(false);

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 150, height: 150 } };
        const html5QrCode = new Html5Qrcode("qrCodeContainer");

        const qrScannerStop = () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => console.log("QR Code scanning stopped"))
                    .catch((err) => console.error(err));
            }
        }

        if (isEnabled){
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                (result) => {
                    if (result.length > 0) {
                        console.log(result);
                        sendRequestToFind(result);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            qrScannerStop();
        }

        return () => {
            qrScannerStop();
        }

    }, [isEnabled]);

    const toggleScanner = () => {
        setEnabled(!isEnabled);
    }

    return (
        <section className="relative flex flex-col items-center justify-center">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0" />
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90" />

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

            {date >= seekerStartTime ? (
                <div className="flex flex-col justify-between items-center z-10">
                    <h2 className="text-2xl text-white font-bold mb-8 z-10">You can start seeking now!</h2>
                    <GameTimer endTime={gameEndTime}/>

                    <button
                        className="bg-[#FFC87A] text-black px-4 py-2 rounded-lg mb-2"
                        onClick={toggleScanner}
                    >
                        {isEnabled ? "Stop Scanning QR code" : "Start Scanning Qr code"}
                    </button>

                    <div className="mb-8 w-60 relative">
                        <div id="qrCodeContainer" className="w-full h-full"></div>
                    </div>

                    <input
                        className="w-60 h-8 bg-white rounded-lg p-2 text-black mt-7 mb-2"
                        placeholder="Enter the code here"
                        onChange={(e) => setCodeToSubmit(e.target.value)}
                    />

                    <button className="bg-[#FFC87A] text-black px-4 py-2 rounded-lg"
                            onClick={() => sendRequestToFind()}>
                        Submit
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-between items-center z-10">
                    <h2 className="text-2xl text-white font-bold mb-8 z-10">Please, wait</h2>
                    <GameTimer endTime={seekerStartTime} frozen={true} onComplete={updateDate}/>
                </div>
            )}
        </section>
    );
}
