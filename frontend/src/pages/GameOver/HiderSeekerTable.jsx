export default function HiderSeekerTable({activeButton, setActiveButton, hiderResults, seekerResults}) {
    return (
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
                                <td className="p-2 text-center">{stat?.telegram_id}</td>
                                <td className="p-2 text-center">{stat?.name}</td>
                                <td className="p-2 text-center">
                                    {activeButton === 'seekers'
                                        ? stat?.found
                                        : (stat?.found_time == null ? "Not found" : stat?.found_time)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
