// Header.jsx
import React from 'react';
import logo from "../../assets/logo.svg";
import { useAuth } from '@/components/business/useAuth';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@/components/general/Modal.jsx";

export default function Header({ style }) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNavigateToMain = () => {
        navigate('/');
    };

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        setIsModalOpen(false);
        signOut();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="flex w-full h-24 px-12 justify-between items-center" style={style}>
            <button onClick={handleNavigateToMain}>
                <div className="flex items-center gap-5">
                    <img src={logo} alt="logo" className="h-14" />
                    <span className="text-white text-3xl hidden sm:block">Rooma</span>
                </div>
            </button>

            <button
                className="bg-white bg-opacity-30 z-50 h-14 px-5 text-white text-lg rounded-full"
                onClick={handleLogout}
            >
                Log out
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                action={handleConfirmLogout}
            />
        </header>
    );
}