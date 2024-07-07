import hideAndSeek from "../../assets/gameCardAvatars/hide_and_seek.png";
import killer from "../../assets/gameCardAvatars/killer.png";
import space from "../../assets/gameCardAvatars/space.png";
import facts from "../../assets/gameCardAvatars/facts.jpg";
import man_from from "../../assets/gameCardAvatars/man_from.png";
import {GamesCarousel} from "../../components/game/GamesCarousel.jsx";
import {GamesMenu} from "../../components/game/GamesMenu.jsx";
import {useColor} from '@/components/layouts/ColorContext.jsx';
import {useEffect, useState} from 'react';
import {listCurrent} from "@/api/gamesCommon.js";

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
        name: "Facts",
        img: facts,
    },
    {
        name: "The man from...",
        img: man_from,
    },
];

// object, where the key is name and img is the value
const gameNames = cards.reduce((a, v) => ({...a, [v.name]: v.img}), {})

const noveltiesCards = cards.slice(1);

async function getCardsData() {
    const continueGames = await getContinueGames();

    return {
        Novelties: noveltiesCards,
        Popular: [cards[0]],
        ForYou: [cards[0]],
        Continue: continueGames,
        All: cards,
    };
}

async function getContinueGames() {
    const res = await listCurrent();
    const resFiltered = res.filter(x => x.name in gameNames);
    return resFiltered.map(x => Object.assign(x, {img: gameNames[x.name]}));
}

export default function Main() {
    const {setHeaderColor, setFooterColor, setBackgroundColor} = useColor();

    useEffect(() => {
        setHeaderColor('#3FC7B8');
        setFooterColor('#3FC7B8');
        setBackgroundColor('#3FC7B8');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    const [cardsData, setCardsData] = useState(null);

    useEffect(() => {
        async function fetchCardsData() {
            const data = await getCardsData();
            setCardsData(data);
        }

        fetchCardsData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (!cardsData) {
        return; // or some loading indicator
    }

    return (
        <section>
            <GamesCarousel cards={cards}/>
            <GamesMenu cardsData={cardsData}/>
        </section>
    );
}
