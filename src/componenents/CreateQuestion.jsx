import "./CreateQuestion.css";

import {useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material';
import { Delete } from '@mui/icons-material';


const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "30px", // Adjust the font size
            color: 'red',    // Change the icon color
          },
        },
      },
    },
  });

export default function CreateQuestion(
  {inputName = "Question name", 
  optionType = "Option Type",
  options = 
  [
    {optionName:"qna",optionString:"Text"},
    {optionName:"imageUrl",optionString:"Image URL"},
    {optionName:"textImageUrl",optionString:"Text & Image URL"}
  ]
  }){

    const [selectedOptionTypeButton, setSelectedOptionTypeButton] = useState(null);

    const handleOptionTypeButtonClick = (button) => {
      setSelectedOptionTypeButton(button === selectedOptionTypeButton ? null : button);
    };

    const [buttons, setButtons] = useState([
        { id: 'b1', label: 'Button 1' },
        { id: 'b2', label: 'Button 2' },
      ]);
      const [selectedButton, setSelectedButton] = useState(null);
    
      const handleButtonClick = (button) => {
        console.log("button Clicked");
        setSelectedButton(button);
        console.log(selectedButton);
      };
    
      const handleAddButton = () => {
        const newButtonId = `b${buttons.length + 1}`;
        const newButton = { id: newButtonId, label: `Button ${buttons.length + 1}` };
    
        setButtons([...buttons, newButton]);
      };
    
      const handleDeleteButton = ()=>{
        console.log("delete button clicked");
      }

    

    return <>

        <div className="createQuestionPage">

    <div className="createQuestionContent">

        <div className="createQuestionContentQuestionNameInput">
            <input id = "questionNameInput" name = "questionName" placeholder ={inputName} />
        </div>

        <div className="createQuestionContentQuestionType">

<div className="questionTypeText">
<p id="questionTypeText">{optionType}</p>

</div>
      <div className="optionType">
      {options.map((option)=>
          <button
        className={`radio-button ${selectedOptionTypeButton === option.optionName ? 'active' : ''}`}
        onClick={() => handleOptionTypeButtonClick(option.optionName)}
      >
        {option.optionString}
      </button>
         )}
      </div>
       
        </div>



        <div className='questionOptionsWithAddBtn'>
      {buttons.map((button,index) => (
        <div className='questionOptions'>
        <button
          key={button.id}
          className={`radio-buttonOption ${selectedButton === button.id ? 'active' : ''}`}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </button>

        <button
          key={button.id}
          className={`radio-buttonOption ${selectedButton === button.id ? 'active' : ''}`}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </button>

        {index != 0  && index != 1 && (
            <ThemeProvider theme={theme}>
              <div>
                <Delete onClick={handleDeleteButton} />
              </div>
            </ThemeProvider>
          )}
        </div>
      ))}

    {buttons.length <4 && (
        <button id= "questionOptionsAddBtn" onClick={handleAddButton}>Add Option</button>
    )}
      </div>






        <div className="createQuestionContentSubmitCancel">
            
            <button id="createQuestionContentCancelBtn">Cancel</button>
            <button id="createQuestionContentSubmitBtn">Submit</button>

        </div>


    </div>

        </div>

    </>
}