import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [id, setId] = useState<string | null>(localStorage.getItem("id"));

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUsername = localStorage.getItem("username");
        const savedId = localStorage.getItem("id");

        if (savedToken && savedUsername && savedId) {
            setToken(savedToken);
            setUsername(savedUsername);
            setId(savedId);
        }
    }, []);

    const setAuth = (token: string, username: string, id: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("id", id);
        setToken(token);
        setUsername(username);
        setId(id);
    };

    const contextLogOut = () => {
        localStorage.clear();
        setToken(null);
        setUsername(null);
        setId(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, id, setAuth, contextLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};
