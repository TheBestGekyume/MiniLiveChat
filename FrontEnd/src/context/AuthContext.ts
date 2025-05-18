import { createContext } from "react";

interface AuthContextType {
    token: string | null;
    username: string | null;
    id: string | null;
    setAuth: (token: string, username: string, id: string) => void;
    contextLogOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    username: null,
    id: null,
    setAuth: () => {},
    contextLogOut: () => {},
});
