import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#3FC7B8]">
            <h1 className="text-9xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-8">Page not found</h2>
            <Link to="/">
                <button className="px-8 py-4 text-lg bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Go to main page
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
