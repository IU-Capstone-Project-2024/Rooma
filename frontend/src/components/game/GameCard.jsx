import classNames from "classnames";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Lobby from "@/pages/Lobby/Lobby.jsx";

export default function GameCard({name, img, small, onClick}) {
    return (
        <div
            className={classNames("cursor-pointer flex flex-col justify-between rounded-2xl bg-[#9CD3CD] aspect-square bg-cover border-4 border-[#9CD3CD] hover:scale-105 transition",
                small ? "h-48 md:h-56 xl:h-64" : "h-56 md:h-64 xl:h-80")}
            style={{backgroundImage: `url(${img})`}} onClick={onClick}>
            <div
                className="text-center py-1 text-xl bg-[#] backdrop-brightness-75 text-white rounded-t-2xl">{name}</div>
            <Popup trigger={
                <button
                    className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}>Play
                </button>}>
                {close => (
                    <div className="modal">
                        <div className="header"><b>Settings Placeholder</b></div>
                        <div className="content">
                            {' '}
                            • Change Setting #1<br/>
                            • Change Setting #2<br/>
                            • Change Setting #3<br/>
                            <button
                                className={classNames("m-2 bg-gradient-to-r from-yellow-400 to-pink-500 self-start rounded-xl text-white", small ? "px-6 py-1" : "px-8 py-2")}
                                onClick={() => Lobby(name)}>
                                Create Game
                            </button>
                        </div>
                    </div>
                )}

            </Popup>
        </div>
    );
}