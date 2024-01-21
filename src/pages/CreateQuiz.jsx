import "./CreateQuiz.css";

import {useState} from "react";

export default function CreateQuiz(
  {inputName = "Quiz name", 
  optionType = "Quiz Type",
  options = 
  [
    {optionName:"qna",optionString:"Q & A"},
    {optionName:"pollType",optionString:"Poll Type"}
  ]
  }){

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (button) => {
      setSelectedButton(button === selectedButton ? null : button);
    };

    return <>

        <div className="createQuizPage">

    <div className="createQuizContent">

        <div className="createQuizContentQuizNameInput">
            <input id = "quizNameInput" name = "quizName" placeholder ={inputName} />
        </div>

        <div className="createQuizContentQuizType">

<div className="quizTypeText">
<p id="quizTypeText">{optionType}</p>

</div>
      <div className="createQuizOptionType">
      {options.map((option)=>
          <button
        className={`createQuizRadio-button ${selectedButton === option.optionName ? 'active' : ''}`}
        onClick={() => handleButtonClick(option.optionName)}
      >
        {option.optionString}
      </button>
         )}
      </div>
       

          {/* <button
        className={`radio-button ${selectedButton === 'b1' ? 'active' : ''}`}
        onClick={() => handleButtonClick('b1')}
      >
        Q & A
      </button>

      <button
        className={`radio-button ${selectedButton === 'b2' ? 'active' : ''}`}
        onClick={() => handleButtonClick('b2')}
      >
        Poll Type
      </button> */}

        </div>


        <div className="createQuizContentSubmitCancel">
            
            <button id="createQuizContentCancelBtn">Cancel</button>
            <button id="createQuizContentSubmitBtn">Submit</button>

        </div>


    </div>

        </div>

    </>
}