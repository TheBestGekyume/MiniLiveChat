import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

interface Props {
  userData: { username: string; email: string };
  triggerAlert: (msg: string) => void;
}

function EditForm({ userData, triggerAlert }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);

  const apiUrl = "http://localhost:3000/";
  const endpoint = "user/";
  const id = localStorage.getItem("id");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.put(
        `${apiUrl}${endpoint}${id}`,
        { username, email, password },
        { withCredentials: true }
      );
      const { token, user } = response.data;
      setAuth(token, user.username, user.id);
      triggerAlert("Informações atualizadas com sucesso!");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Erro ao atualizar informações!";
      setError(msg);
      triggerAlert(msg);
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
