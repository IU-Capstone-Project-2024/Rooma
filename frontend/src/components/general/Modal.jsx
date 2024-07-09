import React from 'react';

const Modal = ({isOpen, onClose, action}) => {

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={action}
                    >
                        Log out
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Modal;
