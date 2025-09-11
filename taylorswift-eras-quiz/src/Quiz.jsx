import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import songs from "./songs";

export default function Quiz() {
  const location = useLocation();
  const selectedAlbum = location.state?.album || "Taylor Swift";

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedTracks]);

  const generateQuestion = () => {
    if (!albumData) return;

    // filter out already used songs
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
      setUsedTracks((prev) => [...prev, question.title]); // ✅ mark as used
    }, 1500);
  };

  if (!albumData) return <p>No album found...</p>;
  if (usedTracks.length === totalSongs) {
    // ✅ end screen
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#ec4899",
          color: "white",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "32px" }}>
          QUIZ COMPLETE 
        </h1>
        <p style={{ fontSize: "20px" }}>
          Final Score: {score} / {totalSongs}
        </p>
      </div>
    );
  }

  if (!question) return <p>Loading quiz...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ec4899",
        color: "white",
        padding: "24px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        GUESS THE SONG!
      </h1>

      {/* Hidden YouTube Player (Audio Only) */}
      <YouTube
        videoId={question.id}
        opts={{
          height: "0",
          width: "0",
          playerVars: {
            autoplay: 1,
            start: question.start,
            end: question.end,
          },
        }}
        style={{ display: "none" }}
      />

      {/* Answer Options */}
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
            padding: "20px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center",
          };

          let buttonStyle = {
            ...baseStyle,
            backgroundColor: "#db2777",
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
                backgroundColor: "#9d174d",
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

      {/* Score Display */}
      <p style={{ marginTop: "24px", fontSize: "14px", color: "#f3f4f6" }}>
        Score: {score} / {totalSongs}
      </p>
    </div>
  );
}
