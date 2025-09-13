import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import songs from "./songs";
import Guess from "./components/Guess";
import Color from "color";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedAlbum = location.state?.album || "Taylor Swift";
  const bgColor = location.state?.bgColor || "#f9e0a1";

  const albumData = songs.find((a) => a.album === selectedAlbum);
  const totalSongs = albumData?.tracks.length || 0;

  const [usedTracks, setUsedTracks] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (usedTracks.length < totalSongs) {
      generateQuestion();
    } else if (usedTracks.length === totalSongs) {
      // --- Save best score in localStorage ---
      const bestScores = JSON.parse(localStorage.getItem("bestScores") || "{}");
      const currentBest = bestScores[selectedAlbum] || 0;

      if (score > currentBest) {
        bestScores[selectedAlbum] = score;
        localStorage.setItem("bestScores", JSON.stringify(bestScores));
      }

      navigate("/quiz-completed", {
        state: { score, totalSongs, bgColor, selectedAlbum },
      });
    }
  }, [usedTracks]);

  const generateQuestion = () => {
    if (!albumData) return;

    const remainingTracks = albumData.tracks.filter(
      (t) => !usedTracks.includes(t.title)
    );

    if (remainingTracks.length === 0) return;

    const correctTrack =
      remainingTracks[Math.floor(Math.random() * remainingTracks.length)];

    let wrongOptions = albumData.tracks
      .filter((t) => t.title !== correctTrack.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [...wrongOptions, correctTrack].sort(
      () => 0.5 - Math.random()
    );

    setQuestion(correctTrack);
    setOptions(allOptions);
    setAnswered(false);
    setSelected(null);
  };

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);
    setSelected(option.title);

    if (option.title === question.title) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setUsedTracks((prev) => [...prev, question.title]);
    }, 1500);
  };

  if (!albumData) return <p>No album found...</p>;
  if (!question) return <p>Loading quiz...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: "white",
        padding: "24px",
      }}
    >
      <Guess />

      <YouTube
        videoId={question.id}
        opts={{
          height: "0",
          width: "0",
          playerVars: {
            autoplay: 1,
            start: question.start,
            end: question.start + 10,
          },
        }}
        style={{ display: "none" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {options.map((option, idx) => {
          let baseStyle = {
            padding: "45px",
            borderRadius: "12px",
            fontSize: "23px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center",
            outline: "none",
          };

          let buttonStyle = {
            ...baseStyle,
            backgroundColor: Color(bgColor).darken(0.2).hex(),
            color: "white",
          };

          if (answered) {
            if (option.title === question.title) {
              buttonStyle = {
                ...baseStyle,
                backgroundColor: "#22c55e",
                color: "black",
                boxShadow: "0 0 15px #22c55e",
              };
            } else if (option.title === selected) {
              buttonStyle = {
                ...baseStyle,
                backgroundColor: "#ef4444",
                color: "white",
                boxShadow: "0 0 15px #ef4444",
              };
            } else {
              buttonStyle = {
                ...baseStyle,
                backgroundColor: Color(bgColor).darken(0.2).hex(),
                color: "#f3f4f6",
                opacity: 0.7,
              };
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              style={buttonStyle}
            >
              {option.title.toUpperCase()}
            </button>
          );
        })}
      </div>

      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          marginTop: "24px",
          fontSize: "22px",
          color: Color(bgColor).darken(0.8).hex(),
        }}
      >
        Score: {score} / {totalSongs}
      </p>
    </div>
  );
}
