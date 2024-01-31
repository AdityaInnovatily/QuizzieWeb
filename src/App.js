import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./componenents/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./componenents/CreateQuestion";
import Analytics from "./pages/Analytics";
import DeleteBox from "./componenents/DeleteBox";
import QuestionAnalysis from "./pages/QuestionAnalysis";
import PollAnalysis from "./pages/PollAnalysis";
import Quiz from "./pages/Quiz";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import LinkShare from "./componenents/LinkShare";
import QuizCompletion from "./componenents/QuizCompletion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/" element = {<Dashboard/>}/>
        <Route path = "/analytics" element = {<Analytics/>}/>
        <Route path = "/createQuiz" element = {<CreateQuiz/>}/>
        <Route path = "/createQuestionPage" element = {<CreateQuestionPage/>}/>
        <Route path="/quiz/:quizId" element={<Quiz/>} />
        <Route path = "/quizCompletion" element = {<QuizCompletion/>}/>
        <Route path = "/questionAnalysis" element = {<QuestionAnalysis/>}/>
     
      </Routes>
    </BrowserRouter>
  );
}
