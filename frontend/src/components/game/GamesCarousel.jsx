import {useState} from "react";
import GameCard from "./GameCard.jsx";
import {useSwipeable} from "react-swipeable";
import classNames from "classnames";

export function GamesCarousel({cards}) {
    const [cardIndex, setCardIndex] = useState(1);
    const [track, setTrack] = useState(true);

    const prevIndex = cardIndex === 0 ? cards.length - 1 : cardIndex - 1;
    const nextIndex = cardIndex === cards.length - 1 ? 0 : cardIndex + 1;

    const handlers = useSwipeable({
        onSwipedLeft: () => setCardIndex((cardIndex + 1) % cards.length),
        onSwipedRight: () => setCardIndex(cardIndex === 0 ? cards.length - 1 : cardIndex - 1),
        preventDefaultTouchmoveEvent: true,
        trackTouch: track,
        trackMouse: track
    });

    // Swipe to the previous card
    const goToPrevCard = () => {
        setCardIndex(cardIndex === 0 ? cards.length - 1 : cardIndex - 1);
    };

    // Swipe to the next card
    const goToNextCard = () => {
        setCardIndex((cardIndex + 1) % cards.length);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 overflow-x-hidden py-5" {...handlers}>
                <div className="flex left-0 h-full items-center justify-start pl-4 lg:flex">
                    <button className="arrow left" onClick={goToPrevCard}
                    >
                    <svg width="18" height="64" viewBox="0 0 18 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 4.0658L4 31.5406" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                        <path d="M14 59.2455L4 31.7707" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                    </button>
                </div>
                <GameCard name={cards[prevIndex].name} img={cards[prevIndex].img} small={true}
                          onClick={goToPrevCard}/>
                <GameCard name={cards[cardIndex].name} img={cards[cardIndex].img} setTrack={setTrack}/>
                <GameCard name={cards[nextIndex].name} img={cards[nextIndex].img} small={true}
                          onClick={goToNextCard}/>
                <div className="flex right-0 h-full items-center justify-end pr-4 lg:flex">
                    <button className="arrow right" onClick={goToNextCard}
                    >
                    <svg width="18" height="64" viewBox="0 0 18 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 59.2455L14 31.7707" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                        <path d="M4 4.0658L14 31.5406" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                    </button>
                </div>
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