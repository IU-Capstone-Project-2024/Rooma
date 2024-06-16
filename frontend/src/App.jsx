import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./pages/index/Index.jsx";
import Layout from "./components/layouts/Layout.jsx";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout className="bg-[#3FC7B8]"/>}>
                    <Route exact path="/" element={<Index/>}/>
                </Route>
                {/*<Route path="/about" element={<About/>}/>*/}
            </Routes>
        </BrowserRouter>
    )
}
