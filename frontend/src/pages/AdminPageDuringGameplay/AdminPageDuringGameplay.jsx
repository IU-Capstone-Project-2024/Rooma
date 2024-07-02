import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import clock from "@/assets/hideAndSeek/clock.svg";
import steps_1 from "@/assets/hideAndSeek/steps_1.svg";

export default function AdminPageDuringGameplay() {
    const [searchParams] = useSearchParams();
    const [hiderResults, setHiderResults] = useState([]);
    const [seekerResults, setSeekerResults] = useState([]);
    const [activeButton, setActiveButton] = useState('hiders');
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(12);
    const [seconds, setSeconds] = useState(0);

    const navigate = useNavigate();
    const gameId = searchParams.get("game_id");

    useEffect(() => {
        if (!gameId) {
            navigate("/", { replace: true });
            return;
        }

        // Заполняем фиктивные данные для команд
        const dummyHiderResults = [
            { telegram_id: "123456", name: "Player 1", found_time: "5" },
            { telegram_id: "789012", name: "Player 2", found_time: "10" },
            { telegram_id: "345678", name: "Player 3", found_time: "15" },
            { telegram_id: "456789", name: "Player 4", found_time: "20" },
            { telegram_id: "567890", name: "Player 5", found_time: "25" },
            { telegram_id: "678901", name: "Player 6", found_time: "30" },
            { telegram_id: "789012", name: "Player 7", found_time: "35" },
            { telegram_id: "890123", name: "Player 8", found_time: "40" },
            { telegram_id: "901234", name: "Player 9", found_time: "45" }
        ];
        const dummySeekerResults = [
            { telegram_id: "234567", name: "Player A", found: 3 },
            { telegram_id: "890123", name: "Player B", found: 5 },
            { telegram_id: "456789", name: "Player C", found: 7 },
            { telegram_id: "567890", name: "Player D", found: 9 },
            { telegram_id: "678901", name: "Player E", found: 11 },
            { telegram_id: "789012", name: "Player F", found: 13 },
            { telegram_id: "890123", name: "Player G", found: 15 },
            { telegram_id: "901234", name: "Player H", found: 17 },
            { telegram_id: "012345", name: "Player I", found: 19 }
        ];
        setHiderResults(dummyHiderResults);
        setSeekerResults(dummySeekerResults);

    }, [gameId, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    if (minutes === 0) {
                        if (hours === 0) {
                            clearInterval(timer);
                            finishGame();
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

        return () => clearInterval(timer);
    }, [minutes, hours]);

    const refreshData = () => {
        // В данном случае данные фиксированные, поэтому ничего обновлять не будем
        console.log("Data refreshed");
    };

    const finishGame = () => {
        navigate("http://localhost/");
    };

    return (
        <section className="relative flex flex-col items-center justify-center bg-[#FF7F29]">
            <img src={steps_1} alt="steps" className="absolute top-24 right-0 h-96 z-0"/>
            <img src={steps_1} alt="steps" className="absolute bottom-0 left-0 h-96 z-0 rotate-90"/>

            <h1 className="text-4xl text-white font-bold mb-8 z-10">Hide and Seek</h1>
            <div className="flex flex-col sm:flex-row w-full sm:w-3/4 h-full sm:h-auto z-10">
                <div className="sm:w-1/2 p-4 flex flex-col items-center">
                    <div className="flex space-x-4 mt-4 justify-start w-full">
                        <button
                            className={`px-6 py-3 font-bold rounded ${activeButton === 'hiders' ? 'bg-white text-black' : 'bg-[#FFCD7B] text-black'} hover:bg-white`}
                            onClick={() => setActiveButton('hiders')}
                        >
                            Hiders
                        </button>
                        <button
                            className={`px-6 py-3 font-bold rounded ${activeButton === 'seekers' ? 'bg-white text-black' : 'bg-[#FFCD7B] text-black'} hover:bg-white`}
                            onClick={() => setActiveButton('seekers')}
                        >
                            Seekers
                        </button>
                    </div>

                    <div className="relative mt-4 w-full">
                        <div className="overflow-y-auto max-h-64">
                            <table className="table-auto border-collapse w-full bg-white rounded-lg">
                                <thead className="sticky top-0 bg-gray-200">
                                <tr>
                                    <th className="p-2 text-center">Telegram ID</th>
                                    <th className="p-2 text-center">Name</th>
                                    <th className="p-2 text-center">
                                        {activeButton === 'seekers' ? 'Players Found' : 'Found in Minutes'}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {(activeButton === 'seekers' ? seekerResults : hiderResults).map((stat, index) => (
                                    <tr key={index}>
                                        <td className="p-2 text-center">{stat["telegram_id"]}</td>
                                        <td className="p-2 text-center">{stat["name"]}</td>
                                        <td className="p-2 text-center">
                                            {activeButton === 'seekers' ? stat["found"] : (stat["found_time"] == null ? "Not found" : stat["found_time"])}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="px-6 py-3 bg-[#FFCD7B] text-black font-bold rounded"
                                    onClick={refreshData}>
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/2 p-4 flex flex-col items-center justify-center">
                    <div className="relative w-1/2">
                        <img src={clock} alt="clock" className="w-full h-auto max-w-xs mx-auto"/>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-2xl md:text-3xl">
                                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-[#FFCD7B] text-black font-bold rounded" onClick={finishGame}>
                        Finish game
                    </button>
                </div>
            </div>
        </section>
    );
}
