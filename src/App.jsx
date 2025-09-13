import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import QuizPage from "./Quiz"; 
import QuizCompleted from "./QuizCompleted"; 
import BestScores from "./BestScores";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz-completed" element={<QuizCompleted />} />
        <Route path="/best-scores" element={<BestScores />} /> 
      </Routes>
    </Router>
  );
}
