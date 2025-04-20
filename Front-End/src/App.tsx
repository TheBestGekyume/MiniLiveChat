import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import SideBar from "./components/SideBar/SideBar";


import "./styles/reset.scss";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <SideBar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
