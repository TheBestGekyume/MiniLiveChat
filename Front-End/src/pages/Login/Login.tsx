import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    let [hasAccount, setHasAccount] = useState(true);
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    const apiUrl = "http://localhost:3000";
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const endpoint = hasAccount ? "/login" : "/user";
            const response = await axios.post(
                `${apiUrl}${endpoint}`,
                { username, email, password },
                { withCredentials: true }
            );

            if (hasAccount) {
                const { token, user } = response.data;
                setAuth(token, user.username);
                navigate("/chat");
            } else {
                alert("Cadastro realizado com sucesso!");
                setHasAccount(true);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Erro no login ou cadastro.");
        }
    };

    return (
        <div className="login-container">
            <AnimatePresence mode="wait">
                <motion.section
                    key={hasAccount ? "login" : "register"}
                    id="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        perspective: 1000,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <h1>{hasAccount ? "LOGIN" : "CADASTRO"}</h1>

                        {!hasAccount && (
                            <fieldset>
                                <label htmlFor="username">USERNAME</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </fieldset>
                        )}

                        <fieldset>
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="password">SENHA</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </fieldset>

                        <button type="submit">
                            {hasAccount ? "Acessar" : "Cadastrar"}
                        </button>

                        <p
                            onClick={() => setHasAccount(!hasAccount)}
                            className="toggle-form"
                            style={{ cursor: "pointer" }}
                        >
                            {hasAccount
                                ? "Não tem conta? Cadastre-se"
                                : "Já tem conta? Faça login"}
                        </p>

                        {error && <p className="error">{error}</p>}
                    </form>
                </motion.section>
            </AnimatePresence>
        </div>
    );
}

export default Login;
