import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StartButton({ selectedEra, era }) {
  if (!era) return null; // render only when an era is chosen

  return (
    <motion.button
      onClick={() => alert(`Starting quiz for ${selectedEra}`)}
      className="pixel-btn"
      style={{
        background: era.btnBg || "#9b5de5", 
        color: era.btnText || "#ffffff",    
        borderColor: era.btnBorder || "#4a1d73", 
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
