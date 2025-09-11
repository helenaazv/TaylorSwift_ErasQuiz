import { useState } from "react";
import Header from "./components/Header";
import Eras, { ERAS as eras } from "./components/eras";
import StartButton from "./components/StartButton"; 
import Instructions from "./components/Instructions";


export default function Home() {
  const [selectedEra, setSelectedEra] = useState(null);

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
        alignItems: "center",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Header />

      <Instructions />

      {currentEra && (
        <StartButton selectedEra={selectedEra} era={currentEra} />
      )}

      <div style={{ flex: 1 }} />

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
