// AuthContext.tsx
import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [id, setId] = useState(localStorage.getItem("id"));

    const setAuth = (token: string, username: string, id: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("id", id);
        setToken(token);
        setUsername(username);
        setId(id);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUsername(null);
        setId(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, id, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
