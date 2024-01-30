


import CreateQuestion from "../componenents/CreateQuestion";
import { useLocation ,useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";


export default function CreateQuestionPage(){

    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;

    const {editQuizId, quizName,quizType} = state;
    
    console.log("quizDetials",quizName, quizType);


    useEffect(() => {
      const checkLoginStatus = async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        }
      };
  
      checkLoginStatus();
    }, [navigate]);



    return<>

    {quizType == "q&a" ?  
    <CreateQuestion quizId = {editQuizId} quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Q & A" timerDisplay = "block" />
     :
    <CreateQuestion quizId = {editQuizId} quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Poll Question" timerDisplay = "none" />
    }

       
    </>
}