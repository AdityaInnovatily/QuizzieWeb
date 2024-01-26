import "./Quiz.css";
import React, { useState, useEffect } from "react";

export default function Quiz(){

    let data = [{
        id:"11",
        question:"What is your name ?",
        options: [{
            id:"1",
            text:"option1",
            image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
        },
        {
            id:"2",
            text:"option2",
            image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
        },
        {
            id:"3",
            text:"option3",
            image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
        },
        {
            id:"4",
            text:"option4",
            image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
        },
    ],
    time:10
},
{
    id:"22",
    question:"What is your name2 ?",
    options: [{
        id:"1",
        text:"option1",
        image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
    },
    {
        id:"2",
        text:"option2",
        image:""
    },
    {
        id:"3",
        text:"option3",
        image:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
    },
    {
        id:"4",
        text:"option4",
        image:""
    },
],
time:10
},

{
    id:"33",
    question:"What is your name3 ?",
    options: [{
        id:"1",
        text:"option1",
        image:""
    },
    {
        id:"2",
        text:"option2",
        image:""
    },
    {
        id:"3",
        text:"option3",
        image:""
    },
    {
        id:"4",
        text:"option4",
        image:""
    },
],
time:10
},

];




const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [timer, setTimer] = useState(data[0]?.time);

useEffect(() => {
  const countdown = setInterval(() => {
    setTimer((prevTimer) => {
      if (prevTimer === 0) {
        handleNext();
        return data[currentQuestionIndex + 1]?.time || 0;
      }
      return prevTimer - 1;
    });
  }, 1000);

  return () => clearInterval(countdown);
}, [currentQuestionIndex, data]);

const handleNext = () => {
  clearInterval(timer); // Clear the timer when moving to the next question

  // Check if it's the last question
  if (currentQuestionIndex < data.length - 1) {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  } else {
    // Handle quiz completion, e.g., show results
    console.log('Quiz completed!');
  }

  setTimer(data[currentQuestionIndex + 1]?.time || 0);
};

const currentQuestion = data[currentQuestionIndex];


    return <>
    
    {/* <div className="quizOverlay"></div> */}
        <div className="quizPage">

            <div className="quizContent">
      <div className="quizHeader">
      <div className="questionCount">0{currentQuestionIndex + 1}/0{data.length}</div>
      <div className="questionTimer">00:{timer >= 10 ? timer:  "0" +timer}s</div>
      </div>
      <div className="quizQuestion">{currentQuestion?.question}</div>
      <div className="quizOptions">
        {currentQuestion?.options.map((option) => (

          <div key={option?.id} className="quizOption">
          {option?.image && option?.text ? 
    <>
      <p>{option?.text}</p>
      <img src={option?.image} />
    </> : 
    option?.text ? 
      <p>{option?.text}</p> : 
      <img src={option?.image} />
  }
         
          </div>

        ))}
      </div>

       <button className = "createQuestionContentSubmitBtn" 
      onClick={handleNext}>
      {currentQuestionIndex == data.length-1 ? 
      "Submit" : "Next"}</button>
               
            </div>
        </div>
    
    </>
}