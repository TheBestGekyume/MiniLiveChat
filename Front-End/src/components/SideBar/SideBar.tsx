import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Home, MessageSquare, Settings, CircleUserRound } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

import "./Sidebar.scss";

const Sidebar: React.FC = () => {
    const { token, username } = useContext(AuthContext);

    return (
        <aside id="sidebar">
            <nav>
                <div className="link_container">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive ? "nav_link active" : "nav_link"
                        }
                    >
                        <Home size={24} />
                        <span>Início</span>
                    </NavLink>

                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            isActive ? "nav_link active" : "nav_link"
                        }
                    >
                        <MessageSquare size={24} />
                        <span>Chat Geral</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? "nav_link active" : "nav_link"
                        }
                    >
                        <Settings size={24} />
                        <span>Configurações</span>
                    </NavLink>
                </div>

                {/* <div className="user_info">
                    <CircleUserRound className="user_icon" />
                    <p>{username}</p>
                </div> */}

                <div className="user_info">
                    <CircleUserRound
                        className={`user_icon${!token ? "_unauthenticated" : "" }`}
                    />
                    {token ? (
                        <p>{username}</p>
                    ) : (
                        <NavLink to="/login">
                            <p>Login</p>
                        </NavLink>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
