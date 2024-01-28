


import CreateQuestion from "../componenents/CreateQuestion";
import { useLocation } from "react-router-dom";


export default function CreateQuestionPage(){

    const location = useLocation();
    const { state } = location;

    const {quizName,quizType} = state;
    
    console.log("quizDetials",quizName, quizType);

    return<>

    {quizType == "q&a" ?  
    <CreateQuestion quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Q & A" timerDisplay = "block" />
     :
    <CreateQuestion quizName = {quizName} quizType = {quizType} placeholderInputQuestion = "Poll Question" timerDisplay = "none" />
    }

       
    </>
}