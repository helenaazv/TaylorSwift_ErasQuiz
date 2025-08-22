import { useState } from "react";
import { motion } from "framer-motion";

const eras = [
  { name: "Taylor Swift", img: "/TS.png", color: "#a8d5ba" },   // mint green
  { name: "Fearless", img: "/Fearless.png", color: "#f9e0a1" }, // soft yellow
  { name: "Speak Now", img: "/Speaknow.png", color: "#d9c2e9" },// lavender purple
  { name: "Red", img: "/Red.png", color: "#814950" },           // muted wine red
  { name: "1989", img: "/1989.png", color: "#2c5d73" },         // deep teal blue
  { name: "Reputation", img: "/Rep.png", color: "#2c2c2c" },    // dark charcoal
  { name: "Lover", img: "/Lover.png", color: "#f6bcd8" },       // pastel pink
  { name: "Folklore", img: "/Folklore.png", color: "#d6d6d6" }, // soft gray
  { name: "Evermore", img: "/evermore.png", color: "#c8a878" }, // warm beige
  { name: "Midnights", img: "/Midnights.png", color: "#4a5a9c" }, // midnight blue
  { name: "Tortured Poets Department", img: "/TPD.png", color: "#383737ff" }, // muted orange
];

export default function Home() {
  const [selectedEra, setSelectedEra] = useState(null);

  const bgColor = selectedEra
    ? eras.find((era) => era.name === selectedEra).color
    : "#f9e0a1"; // default background

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      {/* Title as Image */}
      <div className="text-center mb-4">
        <img
          src="/title.png"   // replace with your title image path
          alt="Taylor Swift The Eras Song Quiz"
          className="mx-auto w-96" // adjust width as needed
        />
      </div>

      {/* Instructions */}
      {!selectedEra && (
        <p className="text-center mb-6">
          Test your knowledge of every Taylor Swift era!
          <br />
          1. Pick an Era Below <br />
          2. Listen Closely <br />
          3. Guess the Song
        </p>
      )}

      {/* Eras Photos */}
      <div className="flex w-full max-w-5xl h-72 rounded-xl shadow-lg overflow-hidden">
        {eras.map((era) => (
          <motion.button
            key={era.name}
            onClick={() => setSelectedEra(era.name)}
            className="relative h-full overflow-hidden"
            animate={{
              flex: selectedEra === era.name ? 4 : 1, // expand clicked, shrink others
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={era.img}
              alt={era.name}
              className="h-full w-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Start Button */}
      {selectedEra && (
        <motion.button
          className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-900 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => alert(`Starting quiz for ${selectedEra}`)}
        >
          START
        </motion.button>
      )}
    </div>
  );
}
