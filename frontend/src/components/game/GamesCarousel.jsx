import {useState} from "react";
import GameCard from "./GameCard.jsx";
import {useSwipeable} from "react-swipeable";
import classNames from "classnames";

export function GamesCarousel({cards}) {
    const [cardIndex, setCardIndex] = useState(1);

    const prevIndex = cardIndex === 0 ? cards.length - 1 : cardIndex - 1;
    const nextIndex = cardIndex === cards.length - 1 ? 0 : cardIndex + 1;

    const handlers = useSwipeable({
        onSwipedLeft: () => setCardIndex((cardIndex + 1) % cards.length),
        onSwipedRight: () => setCardIndex(cardIndex === 0 ? cards.length - 1 : cardIndex - 1),
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 overflow-x-hidden py-5" {...handlers}>
                <GameCard name={cards[prevIndex].name} img={cards[prevIndex].img} small={true}
                          onClick={() => setCardIndex(cardIndex === 0 ? cards.length - 1 : cardIndex - 1)}/>
                <GameCard name={cards[cardIndex].name} img={cards[cardIndex].img}/>
                <GameCard name={cards[nextIndex].name} img={cards[nextIndex].img} small={true}
                          onClick={() => setCardIndex((cardIndex + 1) % cards.length)}/>
            </div>
            <div className="flex items-center gap-3 self-center">
                {cards.map((_, index) => (
                    <div key={index}
                         className={classNames("cursor-pointer rounded-full h-3 w-3", cardIndex === index ? "bg-[#FFCC7A]" : "bg-[#C8C8C8]")}
                         onClick={() => setCardIndex(index)}/>
                ))}
            </div>
        </div>
    );
}