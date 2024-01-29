


import CreateQuestion from "../componenents/CreateQuestion";
import { useLocation } from "react-router-dom";


export default function CreateQuestionPage(){

    const location = useLocation();
    const { state } = location;

    const {editQuizId, quizName,quizType} = state;
    
    console.log("quizDetials",quizName, quizType);

    return<>

    {quizType == "q&a" ?  
    <CreateQuestion quizId = {editQuizId} quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Q & A" timerDisplay = "block" />
     :
    <CreateQuestion quizId = {editQuizId} quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Poll Question" timerDisplay = "none" />
    }

       
    </>
}