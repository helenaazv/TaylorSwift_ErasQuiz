import { useEffect, useState, useRef } from "react";

export default function Quiz({ tracks }) {
  const [playerReady, setPlayerReady] = useState(false);
  const [score, setScore] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [choices, setChoices] = useState([]);
  const [question, setQuestion] = useState("");
  const playerRef = useRef(null);

  // 1. Handle missing data early
  if (!tracks || tracks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No tracks available for this era.</p>
      </div>
    );
  }

  // 2. Load YouTube API only once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      // Already loaded
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once

  function createPlayer() {
    playerRef.current = new window.YT.Player("player", {
      height: "0",
      width: "0",
      videoId: tracks[0].id, // initial video
      playerVars: { autoplay: 0, controls: 0 },
      events: {
        onReady: () => setPlayerReady(true),
      },
    });
  }

  // 3. Generate new question whenever player becomes ready
  useEffect(() => {
    if (playerReady) {
      nextQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerReady]);

  function nextQuestion() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const song = tracks[randomIndex];
    setCurrentSong(song);

    if (playerRef.current) {
      playerRef.current.loadVideoById({
        videoId: song.id,
        startSeconds: song.start,
        endSeconds: song.end,
      });
    }

    // Shuffle 4 choices
    const options = [...tracks.map((s) => s.title)];
    const shuffled = options.sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.includes(song.title)) {
      shuffled[Math.floor(Math.random() * 4)] = song.title;
    }
    setChoices(shuffled);
    setQuestion("Which Taylor Swift song is this?");
  }

  function handleChoice(title) {
    if (!currentSong) return;

    if (title === currentSong.title) {
      setScore((prev) => prev + 1);
      alert("Correct!");
    } else {
      alert(`Wrong! The correct answer was "${currentSong.title}"`);
    }
    nextQuestion();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">{question}</h1>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {choices.map((title) => (
          <button
            key={title}
            className="bg-purple-200 px-4 py-2 rounded hover:bg-purple-400 transition"
            onClick={() => handleChoice(title)}
          >
            {title}
          </button>
        ))}
      </div>

      <p className="mt-4">Score: {score}</p>
      <div id="player"></div>
    </div>
  );
}
