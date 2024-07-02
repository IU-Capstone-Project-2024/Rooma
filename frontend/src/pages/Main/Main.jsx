import hideAndSeek from "../../assets/gameCardAvatars/hide_and_seek.png";
import killer from "../../assets/gameCardAvatars/killer.png";
import space from "../../assets/gameCardAvatars/space.png";
import {GamesCarousel} from "../../components/game/GamesCarousel.jsx";
import {GamesMenu} from "../../components/game/GamesMenu.jsx";
import { useColor } from '@/components/layouts/ColorContext.jsx';
import { useEffect } from 'react';

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

const cardsData = {
    Novelties: cards,
    Popular: cards,
    ForYou: [cards[1]],
    Continue: cardsEmpty,
    All: cards,
};

export default function Main() {
    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

    useEffect(() => {
        setHeaderColor('#3FC7B8');
        setFooterColor('#3FC7B8');
        setBackgroundColor('#3FC7B8');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    return (
        <section>
            <GamesCarousel cards={cards} />
            <GamesMenu cardsData={cardsData} />
        </section>
    );
}
