import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

import EditForm from "../../components/EditForm/EditForm";
import SettingsOptions from "../../components/SettingOptions/SettingOptions";

import { getUser } from "../../services/userService";

import "./Settings.scss";
function Settings() {
  const [openedSessions, setOpenedSessions] = useState([false, false, false]);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { contextLogOut } = useContext(AuthContext);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) return;
    const fetchUserData = async () => {
      try {
        const user = await getUser(id);
        setUserData({ username: user.username, email: user.email });
      } catch (err) {
        triggerAlert("Erro ao buscar usuário!");
      }
    };
    fetchUserData();
  }, [id]);

  const toggleSession = (index: number) => {
    setOpenedSessions((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
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
