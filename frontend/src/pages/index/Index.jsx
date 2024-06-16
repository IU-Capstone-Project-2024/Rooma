import hideAndSeek from "../../assets/GameCardAvatars/hide_and_seek.png";
import killer from "../../assets/GameCardAvatars/killer.png";
import space from "../../assets/GameCardAvatars/space.png";
import {GamesCarousel} from "../../components/game/GamesCarousel.jsx";

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

export default function Index() {

    return (
        <section>
            <GamesCarousel cards={cards}/>
        </section>
    );
}