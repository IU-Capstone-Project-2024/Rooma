import {useEffect, useState} from 'react';
import Trophy from '../../components/game/Trophy.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import {getHiderResults, getSeekerResults, getState} from "@/api/hideAndSeek.js";

export default function WinningTeam() {
    const [searchParams] = useSearchParams();
    const [winningTeam, setWinningTeam] = useState("");
    const [hiderResults, setHiderResults] = useState([]);
    const [seekerResults, setSeekerResults] = useState([]);

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");


    useEffect(() => {
        const fetchData = async () => {
            if (!gameId) {
                navigate("/", {replace: true});
                return;
            }

            try {
                const res = await getState(gameId);
                const currentWinningTeam = res["state"];
                setWinningTeam(currentWinningTeam);

                if (currentWinningTeam !== "seekers_win" && currentWinningTeam !== "hiders_win") {
                    alert("Game has not ended!");
                    navigate("/", {replace: true});
                    return;
                }

                if (currentWinningTeam === "seekers_win") {
                    const seekerRes = await getSeekerResults(gameId);
                    setSeekerResults(seekerRes);
                } else {
                    const hiderRes = await getHiderResults(gameId);
                    setHiderResults(hiderRes);
                }
            } catch (err) {
                alert(err);
                navigate("/", {replace: true});
            }
        };

        fetchData();
    }, [gameId, navigate]);

    return (
        <div className="bg-[#FF7F29] text-center space-y-10 p-5 flex flex-col sm:px-8">

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
                <table className="table-auto border-collapse  w-full">
                    <thead>
                    <tr>
                        <th className="border border-white bg-yellow-400 p-2">Telegram ID</th>
                        <th className="border border-white bg-yellow-400 p-2">Name</th>
                        <th className="border border-white bg-yellow-400 p-2">
                            {winningTeam === 'seekers_win' ? 'Players Found' : 'Time Hidden (in minutes)'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(winningTeam === 'seekers_win' ? seekerResults : hiderResults).map((stat, index) => (
                        <tr key={index}>
                            <td className="border border-white bg-yellow-200 p-2">{stat["telegram_id"]}</td>
                            <td className="border border-white bg-yellow-200 p-2">{stat["name"]}</td>
                            <td className="border border-white bg-yellow-200 p-2">
                                {winningTeam === 'seekers_win' ? stat["found"] : stat["found_time"]}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
