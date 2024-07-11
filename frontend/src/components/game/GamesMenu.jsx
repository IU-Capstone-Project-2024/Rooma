import {useState} from "react";
import classNames from "classnames";
import GameCard from "./GameCard.jsx";
import novelties from "../../assets/navbar/novelties.svg";
import popular from "../../assets/navbar/popular.svg";
// import forYou from "../../assets/navbar/forYou.svg";
import continueSVG from "../../assets/navbar/continue.svg";
import all from "../../assets/navbar/all.svg";
import ContinueGameCard from "@/components/game/ContinueGameCard.jsx";

const menuItems = [
    {
        categoryId: "Novelties",
        label: "Novelties",
        icon: novelties,
    },
    {
        categoryId: "Popular",
        label: "Popular",
        icon: popular,
    },
    // {
    //     categoryId: "ForYou",
    //     label: "For You",
    //     icon: forYou,
    // },
    {
        categoryId: "Continue",
        label: "Continue",
        icon: continueSVG,
    },
    {
        categoryId: "All",
        label: "All",
        icon: all,
    },
];

export function GamesMenu({cardsData}) {
    const [selectedCategory, setSelectedCategory] = useState(menuItems[0].categoryId);

    const selectedCards = cardsData[selectedCategory];

    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-around items-center gap-5">
                {menuItems.map((item) => (
                    <div
                        key={item.categoryId}
                        className={classNames(
                            "flex flex-row items-center p-3 cursor-pointer rounded-xl gap-2 flex-shrink-0",
                            {"bg-[#B0E8E2]": selectedCategory === item.categoryId}
                        )}
                        onClick={() => setSelectedCategory(item.categoryId)}
                    >
                        <img src={item.icon} alt={item.label} className="h-8 w-8"/>
                        <span className="text-white text-2xl whitespace-nowrap hidden md:block"> {item.label}</span>
                    </div>
                ))}
            </div>

            {selectedCards.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-5 mx-auto">
                    {selectedCards.map((card, index) => (
                        <div key={index} className="flex justify-center">
                            {
                                selectedCategory === "Continue"
                                    ? (<ContinueGameCard
                                        name={card.name}
                                        img={card.img}
                                        small={true}
                                        gameId={card.game_id}
                                        isHost={card.is_host}
                                        isActive={card.is_active}
                                    />)
                                    : (<GameCard name={card.name} img={card.img} small={true}/>)
                            }
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64 text-white text-2xl">
                    <p>No games available.</p>
                </div>
            )}

        </div>
    );
}