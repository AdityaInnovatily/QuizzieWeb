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

  let mainQuestionData = [
    {
    id:"question1",
    question:"",
    options:[ 
          {id:"optionId1",text:"",imageUrl:""},
          {id:"optionId2",text:"",imageUrl:""},
          {id:"optionId3",text:"",imageUrl:""},
          {id:"optionId4",text:"",imageUrl:""}
            ],
    solution:[{id:"", text:"", imageUrl:""}],
    time:0
    },
    {
      id:"question2",
      question:"",
      options:[ 
            {id:"optionId1",text:"",imageUrl:""},
            {id:"optionId2",text:"",imageUrl:""},
            {id:"optionId3",text:"",imageUrl:""},
            {id:"optionId4",text:"",imageUrl:""}
              ],
      solution:{id:"", text:"", imageUrl:""},
      time:0
      },
      {
        id:"question3",
        question:"",
        options:[ 
              {id:"optionId1",text:"",imageUrl:""},
              {id:"optionId2",text:"",imageUrl:""},
              {id:"optionId3",text:"",imageUrl:""},
              {id:"optionId4",text:"",imageUrl:""}
                ],
        solution:{id:"", text:"", imageUrl:""},
        time:0
        },
        {
          id:"question4",
          question:"",
          options:[ 
                {id:"optionId1",text:"",imageUrl:""},
                {id:"optionId2",text:"",imageUrl:""},
                {id:"optionId3",text:"",imageUrl:""},
                {id:"optionId4",text:"",imageUrl:""}
                  ],
          solution:{id:"", text:"", imageUrl:""},
          time:0
          },
          {
            id:"question5",
            question:"",
            options:[ 
                  {id:"optionId1",text:"",imageUrl:""},
                  {id:"optionId2",text:"",imageUrl:""},
                  {id:"optionId3",text:"",imageUrl:""},
                  {id:"optionId4",text:"",imageUrl:""}
                    ],
            solution:{id:"", text:"", imageUrl:""},
            time:0
            }
];

let activeQuestionToCreate = "question1";

export default function CreateQuestion(
  {inputName = "Question name", 
  optionType = "Option Type",
  optionTypeOptions = 
  [
    {optionName:"qna",optionString:"Text"},
    {optionName:"imageUrl",optionString:"Image URL"},
    {optionName:"textImageUrl",optionString:"Text & Image URL"}
  ]

  }
  ){

    ///  which question is active to create..
    // const [activeQuestionToCreate, setActiveQuestionToCreate] = useState("question1");



    // for question button 1,2,3,4 

    const [questionButtons, setQuestionButtons] = useState([{ id: "question1" }]);

  const handleAddButton = () => {
    const newButtonId = `question${questionButtons.length + 1}`;
    const newButton = { id: newButtonId };

    setQuestionButtons([...questionButtons, newButton]);
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
                console.log("active question,",activeQuestionToCreate);

                for(let data of mainQuestionData){

                  if(data.id == activeQuestionToCreate){
                    console.log("data.id",activeQuestionToCreate);
                    data.solution[0] = {...obj};
                  }

                };

                // mainQuestionData.map((data)=>{
                //   if(data.id == activeQuestionToCreate){
                //     console.log("data.id",activeQuestionToCreate);
                //     data.solution[0] = {...obj};
                //   }
                // });
                // mainQuestionData[0].solution[0] = {...obj};
            
            }
            
           };
     

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
        console.log("active question1111111,",activeQuestionToCreate);

        for(let data of mainQuestionData){
       
          if(data.id == activeQuestionToCreate){
            console.log("data.id before", data.id, data.options, activeQuestionToCreate);
            data.options = [...optionValues];
            console.log("data.id after", data.id, data.options, activeQuestionToCreate);
          }

        };

        // mainQuestionData[0].options = [...optionValues];
        
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
        console.log("active question2222222,",activeQuestionToCreate);
         for(let data of mainQuestionData){
          if(data.id == activeQuestionToCreate){
            console.log("data.id",activeQuestionToCreate);
            data.options = [...optionValues];
          }
        };
      
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
        // mainQuestionData[0].options = [...new_options];
        console.log("active question33333333,",activeQuestionToCreate);
        for(let data of mainQuestionData){
          if(data.id == activeQuestionToCreate){
            console.log("data.id",activeQuestionToCreate);
            data.options = [...new_options];
          }
        };

        if(id == "optionId3"){
          optionValues.splice(2,1);//it will remove index 2(option3)
          optionValues[2].id = id;// now at index 2 option4 will come and replace to option3
        }  
  
      }

/////////////// end end //////////////////
    
//// submit button////

 const handleSubmitButton = (()=>{
  console.log("question submitted");

 

  console.log(mainQuestionData);
 })
    return <>

        <div className="createQuestionPage">

    <div className="createQuestionContent">

    <div className="createQuestionContentQuestionButton">
    <div className="button-container">
      {questionButtons.map((button,index) => (
      
        <button key={button.id} className="questionCircleButton" onClick={()=> activeQuestionToCreate = button.id}>
          {index +1}
        </button>
      ))}

      {questionButtons.length <5 && (
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
        className={`radio-button ${selectedOptionTypeButton === option.optionName ? 'active' : ''}`}
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
            checked={selectedOption.id === option.id}
            onChange={handleOptionChange}
          />

          <input
            type="text"
            name = {option.id}
            id = {option.id}
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
            <button id="createQuestionContentSubmitBtn" onClick = {handleSubmitButton}>Submit</button>

        </div>


    </div>

        </div>

    </>
}