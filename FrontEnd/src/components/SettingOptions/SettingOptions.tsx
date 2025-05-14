import { CircleChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    title: string;
    children?: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

function SettingsOptions({ title, children, isOpen, onToggle }: Props) {
    return (
        <div className="option">
            <h3>{title}</h3>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                }}
                transition={{
                    opacity: {
                        duration: isOpen ? 0.9 : 0.25,
                        ease: isOpen ? "easeIn" : "easeOut",
                    },
                    height: { duration: 0.3, ease: "easeInOut" },
                }}
                style={{
                    height: 0,
                    pointerEvents: isOpen ? "auto" : "none", // Desabilitar interações quando invisível
                }}
            >
                {children}
            </motion.div>

            <button onClick={onToggle}>
                <CircleChevronDown
                    className={`arrow ${isOpen ? "rotated" : ""}`}
                />
            </button>
        </div>
    );
}

export default SettingsOptions;
