import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateUser } from "../../services/userService";

interface Props {
    userData: { username: string; email: string };
    triggerAlert: (msg: string) => void;
}

function EditForm({ userData, triggerAlert }: Props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const id = localStorage.getItem("id");
    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateUser(id!, {
                username,
                email,
                password,
            });
            const { token, user } = response;
            setAuth(token, user.username, user.id);
            triggerAlert("Informações atualizadas com sucesso!");
        } catch (err) {
            if (err instanceof Error) {
                triggerAlert(err.message);
            } else {
                triggerAlert("Erro ao atualizar informações.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="fieldset_group">
                <fieldset>
                    <label htmlFor="username">NOME</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={userData.username}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={userData.email}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">SENHA</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
            </div>
            <button type="submit" className="option_button">
                Alterar
            </button>
        </form>
    );
}

export default EditForm;
