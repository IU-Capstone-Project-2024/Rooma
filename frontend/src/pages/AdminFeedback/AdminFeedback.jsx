import React, { useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import { useColor } from '@/components/layouts/ColorContext.jsx';
import {getGeneralFeedback } from "@/api/gamesCommon.js";

const FeedbackSummary = () => {
    const navigate = useNavigate();
    const { setHeaderColor, setFooterColor, setBackgroundColor } = useColor();

    const [averageRating, setAverageRating] = React.useState(0);
    const [summarizedFeedback, setSummarizedFeedback] = React.useState("Wait please AI summarize feedback from players...");

    const [searchParams] = useSearchParams();
    const game_id = searchParams.get("game_id");

    useEffect(() => {
        if (!game_id) {
            navigate("/");
        }
    }, [game_id, navigate]);

    useEffect(() => {
        getGeneralFeedback(game_id)
            .then((res) => {
                setAverageRating(res.avg_score);
                setSummarizedFeedback(parseSummarizedFeedback(res.feedback));
            })
    }, [game_id]);

    useEffect(() => {
        setHeaderColor('#FF7F29');
        setFooterColor('#FF7F29');
        setBackgroundColor('#FF7F29');
    }, [setHeaderColor, setFooterColor, setBackgroundColor]);

    const handleBackToMenu = () => {
        navigate("/");
    };

    const renderStars = () => {
        const filledStars = Math.round(averageRating);
        return (
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={`text-3xl ${index < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
                    > ★ </span>
                ))}
            </div>
        );
    };

    const parseSummarizedFeedback = (feedback) => {
        return feedback.split('\n\n').map((block, index) => (
            <div key={index} className="my-4">
                {block.split('**').map((part, i) => (
                    i % 2 === 0
                        ? <span key={i} className="text-xl text-gray-700">{part}</span>
                        : <span key={i} className="bg-[#FFC87A] text-black px-2 py-1 rounded ml-2">{part}</span>
                ))}
            </div>
        ));
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-4xl font-bold text-white mb-8"> Hide and Seek </h1>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full h-fit max-w-3xl text-center">
                <div className="flex justify-center items-center my-4">
                    <span className="text-xl font-semibold mr-2">{averageRating.toFixed(1)}</span>
                    {renderStars()}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Players' impression of the game: </h2>
                <p className="text-xl text-gray-700">
                    {summarizedFeedback}
                </p>
                <button
                    onClick={handleBackToMenu}
                    className="mt-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-xl px-6 py-2"
                > Back to menu </button>
            </div>
        </div>
    );
};

export default FeedbackSummary;
