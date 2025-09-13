import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Color from "color";
import PlayAgainButton from "./components/PlayAgainButton";
import BestScoresButton from "./components/BestScoresButton";

export default function QuizCompleted() {
  const location = useLocation();

  const {
    score = 0,
    totalSongs = 0,
    bgColor = "#f9e0a1",
    selectedAlbum = "Taylor Swift",
  } = location.state || {};

  //localStorage
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("bestScores")) || {};

    const prevBest = storedScores[selectedAlbum]?.score || 0;
    const prevTotal = storedScores[selectedAlbum]?.totalSongs || totalSongs;

    if (score > prevBest) {
      storedScores[selectedAlbum] = { score, totalSongs };
      localStorage.setItem("bestScores", JSON.stringify(storedScores));
    } else if (!storedScores[selectedAlbum]) {
      storedScores[selectedAlbum] = { score, totalSongs };
      localStorage.setItem("bestScores", JSON.stringify(storedScores));
    }
  }, [score, totalSongs, selectedAlbum]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: bgColor,
        padding: "24px",
      }}
    >
      <h1
        className="pixel-btn"
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "0px",
          color: Color(bgColor).darken(0.5).hex(),
        }}
      >
        {selectedAlbum} ERA COMPLETED
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "15px",
          color: Color(bgColor).darken(0.5).hex(),
        }}
      >
        Final Score: {score} / {totalSongs}
      </p>

      {/* Buttons */}
      <PlayAgainButton bgColor={bgColor} />
       {/* link to best scores page <BestScoresButton bgColor={bgColor} /> */}
    </div>
  );
}
