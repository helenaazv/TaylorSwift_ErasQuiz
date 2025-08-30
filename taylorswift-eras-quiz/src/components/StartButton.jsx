import { motion } from "framer-motion";

export default function StartButton({ selectedEra }) {
  return (
    <motion.button
      key="start-btn"
      className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
      onClick={() => alert(`Starting quiz for ${selectedEra}`)}
    >
      START QUIZ
    </motion.button>
  );
}
