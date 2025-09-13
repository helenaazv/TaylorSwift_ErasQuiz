import { motion } from "framer-motion";

export default function Instructions() {
  return (
    <motion.div
      key="instructions"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
      style={{ textAlign: "center" }}
    >
      <p
        className="text-lg"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#000000ff",
          fontSize: "1.5rem",
          fontWeight: "bold" 
        }}
      >
        Select your favorite era below and put your knowledge to the test
      </p>
    </motion.div>
  );
}
