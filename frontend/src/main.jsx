import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './pages/Auth/Auth.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";


export let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth/>
        </BrowserRouter>
    </React.StrictMode>,
)
