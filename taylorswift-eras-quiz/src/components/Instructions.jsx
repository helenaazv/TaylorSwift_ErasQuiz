import { motion } from "framer-motion";

export default function Instructions() {
  return (
    <motion.div
      key="instructions"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h2 className="text-2xl font-semibold mb-2">Test Your Knowledge!</h2>
      <p className="text-lg text-gray-800">
        1. Pick an Era Below <br />
        2. Listen Closely <br />
        3. Guess the Song
      </p>
    </motion.div>
  );
}
