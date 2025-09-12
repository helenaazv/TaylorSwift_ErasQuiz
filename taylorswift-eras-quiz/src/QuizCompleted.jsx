import React from "react";
import { useLocation } from "react-router-dom";
import Color from "color";
import PlayAgainButton from "./components/PlayAgainButton";

export default function QuizCompleted() {
  const location = useLocation();

  const { score = 0, totalSongs = 0, bgColor = "#f9e0a1" } =
    location.state || {};

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
          marginBottom: "32px",
          color: Color(bgColor).darken(0.5).hex(),
        }}
      >
        ERA COMPLETED
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "24px",
          color: Color(bgColor).darken(0.5).hex(),
        }}
      >
        Final Score: {score} / {totalSongs}
      </p>

      {/* Reusable Play Again Button */}
      <PlayAgainButton bgColor={bgColor} />
    </div>
  );
}
