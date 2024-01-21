import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./componenents/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./componenents/CreateQuestion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/r" element={<Register />} />
        <Route path="/l" element={<Login />} />
        <Route path = "d" element = {<Dashboard/>}/>
        <Route path = "/createQuiz" element = {<CreateQuiz/>}/>
        <Route path = "/" element = {<CreateQuestion/>}/>


      </Routes>
    </BrowserRouter>
  );
}
