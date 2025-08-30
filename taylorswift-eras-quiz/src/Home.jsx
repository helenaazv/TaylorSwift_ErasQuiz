import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import StartButton from "./components/StartButton";
import Eras, { ERAS as eras } from "./components/eras";

export default function Home() {
  const [selectedEra, setSelectedEra] = useState(null);

  const bgColor = selectedEra
    ? eras.find((era) => era.name === selectedEra).color
    : "#f9e0a1";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 px-4 pt-44">
        <AnimatePresence>
          {!selectedEra && <Instructions />}
        </AnimatePresence>

        {/* Era Selector Component */}
        <div className="w-full max-w-6xl">
          <Eras 
            height={400}
            collapsedWidth={7}
            hoverBoost={2}
            imageScale={1.025}
            hoverScale={1.01}
            minExpandedWidth={24}
            transitionDuration={350}
          />
        </div>

        <AnimatePresence>
          {selectedEra && <StartButton selectedEra={selectedEra} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
