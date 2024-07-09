import {useState} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {useNavigate} from "react-router-dom";

export default function Feedback() {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const handleFeedbackSubmit = () => {
        console.log(`Rating: ${rating}, Comment: ${comment}`);
        // TODO: submit & save feedback logic
        navigate("/");
    };

    return (
        <Popup
            open={true}
            modal
            contentStyle={{
                maxWidth: "400px",
                minWidth: "60%",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }}
        >
            {close => (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-[#303030] font-bold mb-2"> Feedback </h2>
                        <button
                            className="px-4 py-2 text-xl"
                            onClick={() => close()}
                        > ✖ </button>
                    </div>

                    <div className="text-center text-lg space-y-4">
                        <h3 className="text-lg text-[#615C5C] font-bold"> Leave a comment about this game and share your feelings about it! </h3>

                        <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setRating(index + 1)}
                                    className={`mx-1 text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                > ★ </button>
                            ))}
                        </div>

                        <textarea
                            className="w-full h-24 p-2 border-2 border-[#FFC87A] rounded-xl"
                            placeholder="Enter your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        
                        <button
                            className="mt-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-xl px-6 py-2"
                            onClick={() => {
                                handleFeedbackSubmit();
                                close();
                            }}
                        > Send </button>
                    </div>
                </>
            )}
        </Popup>
    );
}