import "../pages/Quiz.css";
import React, { useState, useEffect,useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizCompletion from "../componenents/QuizCompletion";
import { host,updateQuestionResponse, getQuestionsWithImpressions } from "../APIRoutes";


const Quiz = () => {
  
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]); // Use quizData instead of data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countDown, setCountDown] = useState(Infinity);
  const [userAnswer, setUserAnswer] = useState({id:"",text:"",image:""});
  const [userScore, setUserScore] = useState(0);

  const { quizId } = useParams();

//  console.log("sdfdsfdsfdsfdsf test................",quizId);


  useEffect(() => {
    // Fetch quiz data from the API
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`${getQuestionsWithImpressions}/${quizId}`, {
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

        if(Number(data[currentQuestionIndex]?.time)){
          
          setCountDown(Number(data[currentQuestionIndex]?.time));
        }
      

      } catch (error) {
        console.error('Error fetching quiz data:', error.message);
      }
    };

    fetchQuizData();
  }, []);


  useEffect(() => {
    // Exit the effect if the countdown reaches zero
    if (countDown === 0) {
       handleNext();
    }

    // Update the countdown every second
    const timer = setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    }, 1000);

    // Clear the interval when the component is unmounted or when countdown reaches zero
    return () => clearInterval(timer);
  }, [countDown]); // Run the effect whenever the countDown state changes


  const handleNext = async() => {
    let count= 0;
  
    if(userAnswer.id){

      console.log("userScoe;",userScore);
    if(
      userAnswer.text == quizData[currentQuestionIndex].answer.text &&
      userAnswer.image == quizData[currentQuestionIndex].answer.image 
      ){
     
        if(currentQuestionIndex == quizData.length-1){
          ++count;
        }
      
      setUserScore((prevScore)=>prevScore+1);
      
      }
    
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

    }

    // For submit 
    if (currentQuestionIndex == quizData.length - 1) {
        
          console.log("userScore22222222",quizData[0].quizType,userScore +count,quizData.length);
          navigate('/quizCompletion', {
                state: { quizType: quizData[0].quizType, score: userScore+count, totalQuestion: quizData.length },
              });
  
    } 
   

    setUserAnswer({id:"",text:"",image:""});
    setCurrentQuestionIndex((prev)=>prev + 1);
   if(Number(quizData[currentQuestionIndex]?.time)){
 
          setCountDown(Number(quizData[currentQuestionIndex]?.time));
        }


  };

 
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
      <div className="questionTimer" style={{ display: countDown === Infinity ? 'none' : 'block' }}>
  00:{countDown >= 10 ? countDown : '0' + countDown}s
</div>

      </div>
      <div className="quizQuestion">{quizData[currentQuestionIndex]?.question}</div>
      <div className="quizOptions">
        {quizData[currentQuestionIndex]?.options.map((option) => (

          <div key={option?._id} 
          name = {option?._id}
          value = {userAnswer}
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