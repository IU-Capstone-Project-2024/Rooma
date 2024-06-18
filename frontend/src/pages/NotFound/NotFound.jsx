import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link to={"/"}>Go to main page</Link>
        </>
    );
};

export default NotFound;