import React from "react";

export default function WaitPage() {
    // TODO: add states etc. to prevent double execution
    return (
        <section className="bg-[#FF7F29] space-y-10">
            <h1 className="text-xl text-white font-bold mb-2">Hide and seek</h1>

            <div className="my-8 mx-10 sm:mx-20 md:mx-28 lg:mx-36 text-center text-lg space-y-4 border-4 border-t-amber-400">

                <div className="flex items-center justify-between">
                    <p>Number of participants:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>no limited</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p>Game time:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>1:30:00</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p>Game time:</p>
                    <div className="bg-[#FFC87A] px-2 rounded-lg">
                        <p>00:10:00</p>
                    </div>
                </div>

                <p className="text-left">Game Description: </p>
                <p className="mb-4 text-left">
                    Players will be automatically divided into those who are looking and those who are hiding.
                    After the host starts the game, their role appears on the players screens. Those who are
                    hiding will have their own unique code, which needs to be said if the player is found.
                    The searching player, having found the player, must find out the code and enter it on the
                    phone so that the found person is counted.
                </p>
            </div>
        </section>
    )
};