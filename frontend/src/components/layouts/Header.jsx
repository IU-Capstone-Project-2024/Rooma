import logo from "../../assets/logo.svg";
import {useAuth} from '@/components/business/useAuth';
import {useNavigate} from "react-router-dom";

export default function Header() {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    const handleNavigateToMain = () => {
        navigate('/');
    };

    return (
        <header className="flex w-full h-24 px-12 justify-between items-center">
            <button onClick={handleNavigateToMain}>
                <div className="flex items-center gap-5">
                    <img src={logo} alt="logo" className="h-14"/>
                    <span className="text-white text-3xl hidden sm:block">Rooma</span>
                </div>
            </button>

            <button
                className="bg-[#9CD3CD72] h-14 px-5 text-white text-lg rounded-full"
                onClick={signOut}
            >
                Log out
            </button>
        </header>
    );
}
