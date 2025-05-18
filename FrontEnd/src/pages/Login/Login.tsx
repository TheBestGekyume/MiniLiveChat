import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { loginUser, registerUser } from "../../services/userService";
import "./login.scss";

function Login() {
    const [hasAccount, setHasAccount] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (hasAccount) {
                const { token, user } = await loginUser({ email, password });
                setAuth(token, user.username, user.id);
                navigate("/chat");
            } else {
                await registerUser({ username, email, password });
                alert("Cadastro realizado com sucesso!");
                setHasAccount(true);
            }
        } catch (err) {
            if (err && (err as AxiosError).isAxiosError) {
                const axiosError = err as AxiosError<{
                    error?: string;
                    message?: string;
                }>;
                const message =
                    axiosError.response?.data?.error ||
                    axiosError.response?.data?.message ||
                    "Credenciais inválidas. Verifique e tente novamente.";
                setError(message);
            } else {
                setError("Erro inesperado no login ou cadastro.");
            }
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
