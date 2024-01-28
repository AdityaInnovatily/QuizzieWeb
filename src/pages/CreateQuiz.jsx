import "./CreateQuiz.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CreateQuiz(){

    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    const [quizType, setQuizType] = useState("q&a");
    const [quizName, setQuizName] = useState("");

    const handleButtonClick = (selectedQuizType) => {
      setQuizType(selectedQuizType);
    };

    const handleChange = (event)=>{

      const {name, value} = event.target;

      setQuizName(value);
    }

    return <>

        <div className="createQuizPage">

    <div className="createQuizContent">

        <div className="createQuizContentQuizNameInput">
            <input id = "quizNameInput" name = "quizName" onChange={(e) => handleChange(e)} placeholder = "Quiz name" />
        </div>

        <div className="createQuizContentQuizType">

<div className="quizTypeText">
<p id="quizTypeText">Quiz Type</p>

</div>
      <div className="createQuizOptionType">
      {/* {options.map((option)=>
          <button
        className={`createQuizRadio-button ${selectedButton === option.optionName ? 'active' : ''}`}
        onClick={() => handleButtonClick(option.optionName)}
      >
        {option.optionString}
      </button>
         )} */}


         <button name = "q&a" value = "q&a"
        className={`createQuizRadio-button  ${quizType === "q&a" ? 'active' : ''}`}
        onClick={() => handleButtonClick("q&a")}
      >
      Q&A
        {/* {option.optionString} */}
      </button>


      <button name = "poll" value = "poll"
        className={`createQuizRadio-button ${quizType === "poll" ? 'active' : ''}`}
        onClick={() => handleButtonClick("poll")}
      >
      Poll
        {/* {option.optionString} */}
      </button>
      </div>
       

        </div>

        <div className="createQuizContentSubmitCancel">
            
            <button id="createQuizContentCancelBtn" onClick = {()=>{navigate("/")}}>Cancel</button>
            <button id="createQuizContentSubmitBtn" onClick = {()=>{ 

            console.log("quizName",quizName,Boolean(quizName));
              if(!quizName.trim()){
                toast.error(`Please quiz name`, toastOptions);
              }
              else{
              navigate("/createQuestionPage", {
                    state: { quizName, quizType },
                  });
            }
            }}>Submit</button>

        </div>


    </div>

        </div>
        <ToastContainer />
    </>
}