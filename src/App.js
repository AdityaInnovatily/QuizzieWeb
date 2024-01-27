import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./componenents/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./componenents/CreateQuestion";
import RadioButton from "./componenents/RadioButton";
import Trial from "./componenents/Trial";
import TrendingCard from "./componenents/TrendingCard";
import Analytics from "./pages/Analytics";
import DeleteBox from "./componenents/DeleteBox";
import QuestionAnalysis from "./pages/QuestionAnalysis";
import PollAnalysis from "./pages/PollAnalysis";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/createQuiz" element = {<CreateQuiz/>}/>
        <Route path = "/" element = {<CreateQuestion/>}/>
        <Route path = "/radio" element = {<RadioButton/>}/>
        <Route path = "/t" element = {<Trial/>}/>
        <Route path = "/trend" element = {<TrendingCard/>}/>
        <Route path = "/analytics" element = {<Analytics/>}/>
        {/* <Route path = "/" element = {<DeleteBox/>}/> */}
        {/* <Route path = "/" element = {<QuestionAnalysis/>}/> */}
        {/* <Route path = "/" element = {<PollAnalysis/>}/> */}
        {/* <Route path = "/" element = {<Quiz/>}/> */}

      </Routes>
    </BrowserRouter>
  );
}
