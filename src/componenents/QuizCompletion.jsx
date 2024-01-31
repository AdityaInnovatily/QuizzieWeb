
import "./QuizCompletion.css";
import { useLocation , useNavigate} from "react-router-dom";
import React, { useEffect } from "react";


export default function QuizCompletion(){

    const location = useLocation();
    const { state } = location;
    const { quizType, score, totalQuestion } = state 

    console.log(quizType,score,totalQuestion);

    const navigate = useNavigate();


 let trophyImage = "https://img.freepik.com/free-vector/trophy-award-laurel-wreath-composition-with-realistic-image-golden-cup-decorated-with-garland-with-reflection_1284-32301.jpg";
    return <>
       <div className="quizCompletionComponent">
  <div className="quizCompletionContent">
    {quizType == "q&a" ? (
      <>
        <h1>Congrats Quiz is Completed</h1>
        <img id="trophyImage" src={trophyImage} />
        <h2>
          Your Score is <span>0{score}/0{totalQuestion}</span>
        </h2>
      </>
    ) : (
        <> <h1>Thank you for participating in the Poll</h1></>
     
    )}
  </div>
</div>

    </>

}