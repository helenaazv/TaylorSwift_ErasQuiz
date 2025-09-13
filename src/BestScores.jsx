import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Color from "color";
import { ERAS } from "./components/eras";
import PlayAgainButton from "./components/PlayAgainButton";

export default function BestScores() {
  const [scores, setScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved scores from localStorage
    const storedScores = JSON.parse(localStorage.getItem("bestScores")) || {};
    setScores(storedScores);
  }, []);

  return (
    <div
      className="pixel-btn"
      style={{
        minHeight: "100vh",
        backgroundColor: "#fdf6f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          marginBottom: "32px",
          color: "#333",
        }}
      >
        My Best Scores
      </h1>

      {/* Back Home button */}
      <PlayAgainButton bgColor="#9b5de5" />
    </div>
  );
}
