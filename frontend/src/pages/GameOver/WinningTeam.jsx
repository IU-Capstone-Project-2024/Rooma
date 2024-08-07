import {useEffect, useState} from 'react';
import Trophy from '../../components/game/Trophy.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useColor} from "@/components/layouts/ColorContext.jsx";
import {getHiderResults, getSeekerResults, getState} from "@/api/hideAndSeek.js";
import Feedback from '../../components/game/Feedback.jsx';
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";

export default function WinningTeam() {
    const [searchParams] = useSearchParams();
    const [winningTeam, setWinningTeam] = useState("");
    const [hiderResults, setHiderResults] = useState([]);
    const [seekerResults, setSeekerResults] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    const {setHeaderColor, setFooterColor, setBackgroundColor} = useColor();

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);


    useEffect(() => {
        const fetchData = async () => {
            if (!gameId) {
                navigate("/");
                return;
            }

            const res = await getState(gameId);
            const currentWinningTeam = res["state"];
            setWinningTeam(currentWinningTeam);

            if (!(["seekers_win", "hiders_win", "no_winners"].includes(currentWinningTeam))) {
                alert("Game has not ended!");
                navigate("/");
                return;
            }

            if (currentWinningTeam === "seekers_win") {
                const seekerRes = await getSeekerResults(gameId);
                setSeekerResults(seekerRes);
            } else {
                const hiderRes = await getHiderResults(gameId);
                setHiderResults(hiderRes);
            }
        };

        fetchData();
    }, [gameId, navigate]);

    return (
        <div className="text-center space-y-10 p-5 flex flex-col sm:px-8">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl text-white font-bold">Hide and Seek</h1>
            <div className="flex justify-center my-3 relative">
                <div className="relative">
                    <Trophy/>
                    <div className="inline-block border-[4px] border-gray-400 p-2 rounded-[10px] bg-white">
                        <h2 className="text-2xl text-gray-800">
                            {winningTeam === 'seekers_win' ? 'SEEKERS' : 'HIDERS'}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="overflow-y-auto max-h-64 mt-16 mx-auto w-4/5">
                <table className="table-auto border-collapse  w-full z-10">
                    <thead>
                    <tr>
                        <th className="bg-gray-100 p-2">Telegram ID</th>
                        <th className="bg-gray-100 p-2">Name</th>
                        <th className="bg-gray-100 p-2">
                            {winningTeam === 'seekers_win' ? 'Players Found' : 'Found in Minutes'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(winningTeam === 'seekers_win' ? seekerResults : hiderResults).map((stat, index) => (
                        <tr key={index}>
                            <td className="bg-white p-2">{stat["telegram_id"]}</td>
                            <td className="bg-white p-2">{stat["name"]}</td>
                            <td className="bg-white p-2">
                                {
                                    winningTeam === 'seekers_win'
                                        ? stat["found"]
                                        : (stat["found_time"] == null ? "Not found" : stat["found_time"])
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center relative">
                <div className="relative">
                    <button
                        className="mt-2 px-6 py-3 bg-[#FFCD7B] text-black font-bold rounded"
                        onClick={() => {
                            setShowFeedback(true)
                        }}
                    >
                        Send feedback
                    </button>
                </div>
            </div>
            <Feedback
                name="Hide and Seek"
                gameId={gameId}
                showFeedback={showFeedback}
                setShowFeedback={setShowFeedback}
            />
        </div>
    );
}
