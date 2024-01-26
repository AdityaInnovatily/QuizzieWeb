import "./CreateQuestion.css";

import {useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Add } from '@mui/icons-material';


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
  optionTypeOptions = 
  [
    {optionName:"qna",optionString:"Text"},
    {optionName:"imageUrl",optionString:"Image URL"},
    {optionName:"textImageUrl",optionString:"Text & Image URL"}
  ]

  }){

    // for question button 1,2,3,4 

    const [buttons, setButtons] = useState([{ id: 1 }]);

  const handleAddButton = () => {
    const newButtonId = buttons.length + 1;
    const newButton = { id: newButtonId };

    setButtons([...buttons, newButton]);
  };

  // end /////////////////// end //////// end ////////

    //for selecting question option type like text,imageURL or both.
    const [selectedOptionTypeButton, setSelectedOptionTypeButton] = useState(null);

    const handleOptionTypeButtonClick = (button) => {
      setSelectedOptionTypeButton(button === selectedOptionTypeButton ? null : button);
    };

    /////end//////


    // for selecting answer from options.
    const [selectedOption, setSelectedOption] = useState({id:"",text:"",imageUrl:""});
  
    const handleOptionChange = (event) => {

        console.log("envent;",event.target.value);
        
        for(let val of optionValues){
    
            if(val.id == event.target.value){
                // val.text = event.target.value;
                let obj = {
                    id:event.target.value,
                    text: val.text,
                    imageUrl: val.imageUrl
                };

                setSelectedOption(obj);

            }
            
           };
     
           console.log('answer;',selectedOption);
    };

    /////end

    //for saving all options in the array of objects.
    const [options, setOptions] = useState([
        { id: 'optionId1', label: 'Option 1' },
        { id: 'optionId2', label: 'Option 2' },
      ]);

      const [optionValues, setOptionValues] = useState([
        {id:"optionId1",text:"",imageUrl:""},
        {id:"optionId2",text:"",imageUrl:""},
        {id:"optionId3",text:"",imageUrl:""},
        {id:"optionId4",text:"",imageUrl:""},
    ]);
    
      const handleOptionInputChangeText = (event) => {
        console.log("event;",event.target.name,event.target.value);
       for(let val of optionValues){
    
        if(val.id == event.target.name){
            val.text = event.target.value;
        }
       };
    
        setOptionValues(optionValues);
     console.log("optionValue;",optionValues);
      };
    
    
      const handleOptionInputChangeImageUrl = (event) => {
        console.log("event;",event.target.name,event.target.value);
       for(let val of optionValues){
    
        if(val.id == event.target.name){
            val.imageUrl = event.target.value;
        }
       };
    
        setOptionValues(optionValues);
     console.log("optionValue;",optionValues);
      };

      /////// end end end end ///////////
    

      //this will increase no of options limited upto 4.
       const handleAddOptionButton = () => {
        console.log("add option button clicked");
    const newButtonId = `optionId${options.length + 1}`;
    const newButton = { id: newButtonId, label: `Button ${options.length + 1}` };

    setOptions([...options, newButton]);
  };


    //this will delete option.
     const handleDeleteButton = (id)=>{
        console.log('delete button clicked on id', id);
     
        let new_options = options.filter((ele)=>{
             return ele.id !== id;
        });

        setOptions(new_options);

        if(id == "optionId3"){
          optionValues.splice(2,1);//it will remove index 2(option3)
          optionValues[2].id = id;// now at index 2 option4 will come and replace to option3
        }  
  
      }

/////////////// end end //////////////////
    

    return <>

        <div className="createQuestionPage">

    <div className="createQuestionContent">

    <div className="createQuestionContentQuestionButton">
    <div className="button-container">
      {buttons.map((button) => (

        <button key={button.id} className="questionCircleButton">
          {button.id}
        </button>
      ))}

      {buttons.length <5 && (
        <button className="plus-button" onClick={handleAddButton}>
        <Add />
      </button>
    )}

     
    </div>
    </div>

        <div className="createQuestionContentQuestionNameInput">
            <input id = "questionNameInput" name = "questionName" placeholder ={inputName} />
        </div>

        <div className="createQuestionContentQuestionType">

<div className="questionTypeText">
<p id="questionTypeText">{optionType}</p>

</div>
      <div className="optionType">
      {optionTypeOptions.map((option)=>
          <button
        className={`radio-buttonOption ${selectedOptionTypeButton === option.optionName ? 'active' : ''}`}
        onClick={() => handleOptionTypeButtonClick(option.optionName)}
      >
        {option.optionString}
      </button>
         )}
      </div>
       
        </div>


        <div className='questionOptionsWithAddBtn'>

        {options.map((option, index) => (
        <div className='questionOptions' key={option.id}>

        <input 
            type="radio"
            value={option.id}
            id = {option.id}
          
            checked={selectedOption.id === option.id}
            onChange={handleOptionChange}
          />

          <input
            type="text"
            name = {option.id}
            id = {option.id}
            placeholder= "sa;fd"
            className={`radio-input ${selectedOption.id === option.id ? 'active' : ''}`}
            onChange={(e) => handleOptionInputChangeText(e)}/>

            <input
            type="text"
            id = {option.id}
            name = {option.id}
            className={`radio-input ${selectedOption.id === option.id ? 'active' : ''}`}
            onChange={(e) => handleOptionInputChangeImageUrl(e)}/>

          {index !== 0 && index !== 1 && (
            <ThemeProvider theme={theme}>
              <div>
                <Delete onClick={()=>handleDeleteButton(option.id)} id = {option.id}/>
              </div>
            </ThemeProvider>
          )}
        </div>
      ))}

    {options.length <4 && (
        <button id= "questionOptionsAddBtn" onClick={handleAddOptionButton}>Add Option</button>
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