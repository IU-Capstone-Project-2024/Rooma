import React from 'react';

const NotifyModal = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">You have successfully found a player!</h2>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-['#FF7F29'] text-black rounded-full hover:bg-gray-400"
                        onClick={onClose}
                    >
                        OK
                    </button>

                </div>
            </div>
        </div>
    );
};

export default NotifyModal;
