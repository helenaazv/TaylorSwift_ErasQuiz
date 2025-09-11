import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function StartButton({ selectedEra, era }) {
  const navigate = useNavigate();

  if (!era) return null;

  return (
    <motion.button
      onClick={() => navigate("/quiz", { state: { album: selectedEra } })}
      
      
      className="pixel-btn"
      style={{
        background: era.btnBg || "#9b5de5",
        color: era.btnText || "#ffffff",
        borderColor: era.btnBorder || "#4a1d73",
        margin: "35px",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      START
    </motion.button>
  );
}
