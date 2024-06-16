import GameCard from "../../components/game/GameCard.jsx";
import hideAndSeek from "../../assets/hide_and_seek.png";
import killer from "../../assets/killer.png";
import space from "../../assets/space.png";
import {useState} from "react";
import classNames from "classnames";

const cards = [
    {
        name: "Hide and Seek",
        img: hideAndSeek
    },
    {
        name: "Killer",
        img: killer
    },
    {
        name: "Public Chat",
        img: space
    },
    {
        name: "4",
        img: hideAndSeek
    },
    {
        name: "5",
        img: hideAndSeek
    },
];

function GamesCarousel() {
    const [cardIndex, setCardIndex] = useState(1);

    const prevIndex = cardIndex === 0 ? cards.length - 1 : cardIndex - 1;
    const nextIndex = cardIndex === cards.length - 1 ? 0 : cardIndex + 1;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-around items-center gap-5 overflow-x-hidden">
                <GameCard name={cards[prevIndex].name} img={cards[prevIndex].img} small={true}
                          onClick={() => setCardIndex(cardIndex === 0 ? cards.length - 1 : cardIndex - 1)}/>
                <GameCard name={cards[cardIndex].name} img={cards[cardIndex].img}/>
                <GameCard name={cards[nextIndex].name} img={cards[nextIndex].img} small={true}
                          onClick={() => setCardIndex((cardIndex + 1) % cards.length)}/>
            </div>
            <div className="flex items-center gap-3 self-center">
                {cards.map((_, index) => (
                    <div key={index} className={classNames("cursor-pointer rounded-full h-3 w-3", cardIndex === index ? "bg-[#FFCC7A]" : "bg-[#C8C8C8]")}
                         onClick={() => setCardIndex(index)}/>
                ))}
            </div>
        </div>
    );
}

export default function Index() {

    return (
        <section>
            <GamesCarousel/>
        </section>
    );
}