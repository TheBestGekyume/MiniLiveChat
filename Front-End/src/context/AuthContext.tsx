import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    username: string | null;
    id: number | null;
    setAuth: (token: string | null, username: string | null, id: number | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    username: null,
    id:null,
    setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [id, setId] = useState<number | null>( (Number(localStorage.getItem("id"))) );


    const setAuth = (token: string | null, username: string | null, id: number | null) => {
        if (token && username && id !== null) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("id", id.toString());
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
        }
    
        setToken(token);
        setUsername(username);
        setId(id);
    };
    

    return (
        <AuthContext.Provider value={{ token, username, id, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
