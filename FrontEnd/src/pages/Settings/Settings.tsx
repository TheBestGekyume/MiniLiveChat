import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import EditForm from "../../components/EditForm/EditForm";
import SettingsOptions from "../../components/SettingOptions/SettingOptions";
import { AuthContext } from "../../context/AuthContext";

import "./Settings.scss";

function Settings() {
  const [openedSessions, setOpenedSessions] = useState([false, false, false]);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { contextLogOut } = useContext(AuthContext);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        const user = response.data;
        setUserData({ username: user.username, email: user.email });
      } catch (err) {
        triggerAlert("Erro ao buscar usuário!");
      }
    };
    fetchUser();
  }, []);

  const toggleSession = (index: number) => {
    setOpenedSessions((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  const triggerAlert = (text: string) => {
    setAlertMessage(text);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const logOut = () => {
    contextLogOut();
    triggerAlert("Sessão encerrada!");
  };

  return (
    <section id="settings">
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="alert-message"
        >
          {alertMessage}
        </motion.div>
      )}

      <SettingsOptions
        title="Alterar Informações"
        isOpen={openedSessions[0]}
        onToggle={() => toggleSession(0)}   
      >
        <EditForm userData={userData} triggerAlert={triggerAlert} />
      </SettingsOptions>

      <SettingsOptions
        title="Excluir Conta"
        isOpen={openedSessions[1]}
        onToggle={() => toggleSession(1)}
      >
        {/* Conteúdo futuro para exclusão de conta */}
      </SettingsOptions>

      <SettingsOptions
        title="Sair da Conta"
        isOpen={openedSessions[2]}
        onToggle={() => toggleSession(2)}
      >
        <button className="option_button" onClick={logOut}>
          SAIR DA SESSÃO
        </button>
      </SettingsOptions>
    </section>
  );
}

export default Settings;
