import hideAndSeek from "../../assets/gameCardAvatars/hide_and_seek.png";
import killer from "../../assets/gameCardAvatars/killer.png";
import space from "../../assets/gameCardAvatars/space.png";
import novelties from "../../assets/navbar/novelties.svg";
import popular from "../../assets/navbar/popular.svg";
import forYou from "../../assets/navbar/forYou.svg";
import continueSVG from "../../assets/navbar/continue.svg";
import all from "../../assets/navbar/all.svg";
import { useState } from "react";
import classNames from "classnames";
import GameCard from "../../components/game/GameCard.jsx";
import { GamesCarousel } from "../../components/game/GamesCarousel.jsx";

const cards = [
    {
        name: "Hide and Seek",
        img: hideAndSeek,
    },
    {
        name: "Killer",
        img: killer,
    },
    {
        name: "Public Chat",
        img: space,
    },
    {
        name: "4",
        img: hideAndSeek,
    },
    {
        name: "5",
        img: hideAndSeek,
    },
];

const cardsEmpty = [];


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
    {
        categoryId: "ForYou",
        label: "For You",
        icon: forYou,
    },
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

const cardsData = {
    Novelties: cards,
    Popular: cards,
    ForYou: [cards[1]],
    Continue: cardsEmpty,
    All: cards,
};


export function GamesMenu({ cardsData }) {
    const [selectedCategory, setSelectedCategory] = useState(menuItems[0].categoryId);

    const selectedCards = cardsData[selectedCategory];

    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-around items-center gap-5">
                {menuItems.map((item) => (
                    <div
                        key={item.categoryId}
                        className={classNames(
                            "flex flex-row items-center p-3 cursor-pointer rounded-xl gap-2",
                            { "bg-[#B0E8E2]": selectedCategory === item.categoryId }
                        )}
                        onClick={() => setSelectedCategory(item.categoryId)}
                    >
                        <img src={item.icon} alt={item.label} className="h-8 w-8" />
                        <span className="text-white text-2xl whitespace-nowrap hidden sm:block"> {item.label}</span>
                    </div>
                ))}
            </div>

            {selectedCards.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3 mx-auto">
                    {selectedCards.map((card, index) => (
                        <div key={index} className="flex justify-center">
                            <GameCard name={card.name} img={card.img} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p>No games available.</p>
                </div>
            )}

        </div>
    );
}


export default function Index() {
    return (
        <section>
            <GamesCarousel cards={cards} />

            <GamesMenu cardsData={cardsData} />
        </section>
    );
}
