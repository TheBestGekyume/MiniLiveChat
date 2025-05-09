import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import SideBar from "./components/SideBar/SideBar";
import Settings from "./pages/Settings/Settings";

import "./styles/reset.scss";
import "./styles/App.scss";

function App() {
    return (
        <section id="app">
            <AuthProvider>
                <BrowserRouter>
                    <SideBar />
                    <section id="content">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </section>
                </BrowserRouter>
            </AuthProvider>
        </section>
    );
}

export default App;
