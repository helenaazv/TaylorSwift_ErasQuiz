import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Color from "color";

export default function BestScoresButton({ bgColor = "#9b5de5" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/best-scores")}
      className="pixel-btn"
      style={{
        background: Color(bgColor).darken(0.3).hex(),
        color: "#fff",
        borderColor: Color(bgColor).darken(0.5).hex(),
        margin: "20px",
        padding: "12px 24px",
        fontWeight: "700",
        borderRadius: "12px",
        cursor: "pointer",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      BEST SCORES
    </motion.button>
  );
}
