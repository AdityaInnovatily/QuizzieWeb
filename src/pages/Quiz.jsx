import "./Quiz.css";
import React, { useState, useEffect,useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizCompletion from "../componenents/QuizCompletion";
import { host,updateQuestionResponse, getQuestionsWithImpressions } from "../APIRoutes";


const Quiz = () => {
  
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]); // Use quizData instead of data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [userAnswer, setUserAnswer] = useState({id:"",text:"",image:""});
  const [userScore, setUserScore] = useState(0);

  const { quizIdTest } = useParams();

 console.log("sdfdsfdsfdsfdsf test................",quizIdTest);


  useEffect(() => {
    // Fetch quiz data from the API
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`${getQuestionsWithImpressions}/${quizIdTest}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers required for your GET request
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const data = await response.json();
        setQuizData(data);
        setTimer(data[currentQuestionIndex]?.time);
      } catch (error) {
        console.error('Error fetching quiz data:', error.message);
      }
    };

    fetchQuizData();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
           handleNext();
          return quizData[currentQuestionIndex + 1]?.time;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex, quizData]);

 
  const handleNext = async() => {
    let count= 0;
    // console.log("userDelt",userAnswer,quizData[currentQuestionIndex].answer);
    // console.log("entered1",userAnswer.id);
    // console.log("entered2",quizData[currentQuestionIndex]._id);
    // console.log("entered3",currentQuestionIndex);


    const response  = await fetch(updateQuestionResponse, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${localStorageUserDetails.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: quizData[currentQuestionIndex]._id,
        optionId: userAnswer.id
      }),
    });

      // let data = await response.json();

      // console.log("questionResponse",data);

    if(
      userAnswer.text == quizData[currentQuestionIndex].answer.text &&
      userAnswer.image == quizData[currentQuestionIndex].answer.image 
      ){
        console.log("entry gate1 if",userScore);
        // console.log("userDelt",userAnswer,quizData[currentQuestionIndex].answer);
         setUserScore((prevScore)=>prevScore+1);
      
        //  ++score;
        ++count;
        //  console.log("userScore11111",userScore,count);
      }

    // For submit 
    if (currentQuestionIndex == quizData.length - 1) {
        
          // console.log("userScore22222222",userScore);
          navigate('/quizCompletion', {
                state: { quizType: quizData[0].quizType, score: userScore+count, totalQuestion: quizData.length },
              });
  
    } else {
      console.log("entery gate2 else");
      // For Next
      clearInterval(timer); // Clear the timer when moving to the next question

      // Check if it's the last question
      if (currentQuestionIndex < quizData.length - 1) {
         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Handle quiz completion, e.g., show results
        console.log('Quiz completed!');
      }

       setTimer(quizData[currentQuestionIndex + 1]?.time || 0);
    }

    setUserAnswer({id:"",text:"",image:""});


  };

  const currentQuestion = quizData[currentQuestionIndex];


  const userSelectedOption = (option) => {
    // Assuming 'option' is an object with 'text' and 'image' properties
   console.log("option selected",option);
    setUserAnswer({
      id: option?._id ||'',
      text: option?.text || '',
      image: option?.image || '',
    });
    
  };



    return <>
    
    {/* <div className="quizOverlay"></div> */}
        <div className="quizPage">

            <div className="quizContent">
      <div className="quizHeader">
      <div className="questionCount">0{currentQuestionIndex + 1}/0{quizData.length}</div>
      <div className="questionTimer">00:{timer >= 10 ? timer:  "0" +timer}s</div>
      </div>
      <div className="quizQuestion">{currentQuestion?.question}</div>
      <div className="quizOptions">
        {currentQuestion?.options.map((option) => (

          <div key={option?._id} 
          name = {option?._id}
          onClick={() => userSelectedOption(option)}
          className={`quizOption ${userAnswer?.id == option?._id ? "active": ""}`}
          >
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
      {currentQuestionIndex == quizData.length-1 ? 
      "Submit" : "Next"}</button>

     
               
            </div>
            
        </div>
      
    </>
}

export default Quiz;