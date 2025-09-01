import { useState } from "react";
import Header from "./components/Header";
import Eras, { ERAS as eras } from "./components/eras";
import StartButton from "./components/StartButton"; // import the button

export default function Home() {
  const [selectedEra, setSelectedEra] = useState(null);

  // find the full era object when one is selected
  const currentEra = selectedEra
    ? eras.find((era) => era.name === selectedEra)
    : null;

  const bgColor = currentEra ? currentEra.color : "#f9e0a1";

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // center header + button horizontally
      }}
    >
      {/* Top header */}
      <Header />

      {/* Button under the header, only shows once an era is selected */}
      {currentEra && (
        <StartButton selectedEra={selectedEra} era={currentEra} />
      )}

      {/* Spacer takes up everything else */}
      <div style={{ flex: 1 }} />

      {/* Eras bar pinned to bottom */}
      <div style={{ height: "400px", width: "100%" }}>
        <Eras
          height={400}
          collapsedWidth={7}
          hoverBoost={2}
          imageScale={1.025}
          hoverScale={1.01}
          minExpandedWidth={24}
          transitionDuration={350}
          onSelect={(eraName) => setSelectedEra(eraName)}
        />
      </div>
    </div>
  );
}
