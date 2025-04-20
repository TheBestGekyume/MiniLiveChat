import { useState } from "react";
import axios from "axios";
import "./login.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const apiUrl = "http://localhost:3000";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email,
                password,
            }, {
                withCredentials: true
            });
        
            const token = response.data.token;
            localStorage.setItem("token", token);

            alert("Login realizado com sucesso!");
            
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Falha no login.");
        }
    };

    return (
        <section id="login">
            <form>
                <h1>LOGIN</h1>

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

                <button onClick={handleSubmit}>Acessar</button>
                {error && <p className="error">{error}</p>}

            </form>
        </section>
    );
}

export default Login;