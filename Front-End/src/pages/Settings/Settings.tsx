import { useState, useContext } from "react";
import { CircleChevronDown } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

import "./Settings.scss";

function Settings() {
    const [openedSessions, setOpenedSessions] = useState([false, false, false]);
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    const apiUrl = "http://localhost:3000";
    const id = localStorage.getItem("id");
    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const endpoint = `/user/${id}`;
            const response = await axios.put(
                `${apiUrl}${endpoint}`,
                { username, email, password },
                { withCredentials: true }
            );
            console.log(response.data)
            const { token, user } = response.data;
            setAuth(token, user.username, user.id);
            alert("Alteração Realizada com Sucesso");
        } catch (err: any) {
            setError(err.response?.data?.error || "Erro no login ou cadastro.");
            console.log(error);
        }
    };

    const toggleSession = (index: number) => {
        setOpenedSessions((prev) =>
            prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
    };

    return (
        <section id="settings">
            <div className="option">
                <h3>Alterar Informações</h3>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: openedSessions[0] ? 1 : 0,
                        height: openedSessions[0] ? "auto" : 0
                      }}
                      transition={{
                        opacity: { duration: openedSessions[0] ? 0.9 : 0.25, ease: openedSessions[0] ? "easeIn": "easeOut"},
                        height: { duration: 0.3, ease: "easeInOut" }
                      }}
                      
                    //   style={{ overflow: "hidden" }}
                    >
                        
                            <form onSubmit={handleSubmit}>

                                <div className="fieldset_group">
                                    <fieldset>
                                        <label htmlFor="username">
                                            NOME
                                        </label>
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

                                    <fieldset>
                                        <label htmlFor="email">EMAIL</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </fieldset>
                                </div>
                                <button type="submit">Alterar</button>

                                {/* {error && <p className="error">{error}</p>} */}
                            </form>
                        
                    </motion.div>

                <button onClick={() => toggleSession(0)}>
                    <CircleChevronDown
                        className={`arrow ${
                            openedSessions[0] ? "rotated" : ""
                        }`}
                    />
                </button>
            </div>

            <div className="option">
                <h3>Excluir Conta</h3>
                <button onClick={() => toggleSession(1)}>
                    <CircleChevronDown
                        className={`arrow ${
                            openedSessions[1] ? "rotated" : ""
                        }`}
                    />
                </button>
            </div>

            <div className="option">
                <h3>Sair da Conta</h3>
                <button onClick={() => toggleSession(2)}>
                    <CircleChevronDown
                        className={`arrow ${
                            openedSessions[2] ? "rotated" : ""
                        }`}
                    />
                </button>
            </div>
        </section>
    );
}

export default Settings;
