import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    username: string | null;
    setAuth: (token: string | null, username: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    username: null,
    setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));

    const setAuth = (token: string | null, username: string | null) => {
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", username ?? "");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
        setToken(token);
        setUsername(username);
    };

    return (
        <AuthContext.Provider value={{ token, username, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
