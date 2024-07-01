import React, { useEffect, useState } from 'react';
import Trophy from '../../components/game/Trophy.jsx';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getState } from "@/api/hideAndSeek.js";

export default function WinningTeam() {
    //TODO: Get data from back-end (now only the winning team from GetStatus)

  
    // Sample of back-end data
    const winningTeam = 'seekers_win'; // or 'hiders_win'
    const statistics = [
        { name: 'Azamat', found: '5 players' },
        { name: 'Azamat', found: '4 players' },
        { name: 'Azamat', found: '3 players' },
        { name: 'Azamat', found: '2 players' },
        { name: 'Azamat', found: '1 player' },
        { name: 'Azamat', found: 'None' },
    ];


    return (
        <div className="bg-[#FF7F29] text-center space-y-10 p-5 flex flex-col sm:px-8">

            <h1 className="text-4xl text-white font-bold">Hide and Seek</h1>
            <div className="flex justify-center my-3 relative">
                <div className="relative">
                    <Trophy />
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
                            <th className="border border-white bg-yellow-400 p-2">Name</th>
                            <th className="border border-white bg-yellow-400 p-2">
                                {winningTeam === 'seekers_win' ? 'Players Found' : 'Time Hidden'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.map((stat, index) => (
                            <tr key={index}>
                                <td className="border border-white bg-yellow-200 p-2">{stat.name}</td>
                                <td className="border border-white bg-yellow-200 p-2">
                                {winningTeam === 'seekers_win' ? stat.found : stat.hiddenTime}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
