import React, { useState } from 'react'
import './CreateQuestion.css';
import { Delete } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { createQuiz,host } from "../APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import LinkShare from './LinkShare';



export default function CreateQuestion({quizName, quizType, placeholderInputQuestion = "Q & A", timerDisplay = "block"}){

    const localStorageUserDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

    console.log("localStorage;", localStorageUserDetails);
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    

  const [questionIndex,setQuestionIndex]=useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const initialState={
      pollQuestion:"",
      questionType:"text",
      timer:"0",
      ans:"",
      ques:{
          '1':{option1:"", imgUrl1:""},
          '2':{option2:"", imgUrl2:""}
      }
  }

  const [questions,setQuesitons]=useState([initialState])

  const [activeOption, setActiveOption] = useState('0');


  const addQuestionHander=()=>{
      if(questions.length<5){
          setQuesitons(prev=>([...prev,initialState]))
      }
      setQuestionIndex(prev=>prev+1);
  }

  const removeQuestionhandler=(index)=>{
      const newQuestion= questions.filter((each,idx)=>idx!==index)
      setQuesitons(newQuestion)
      setQuestionIndex(prev=>prev-1)
  }

  const onInputChange=(e)=>{
      const {name,value}=e.target
      const updatedQuestions = questions.map((each, idx) => {
     
        console.log("name,tarvgt",name,value);
        if(name == "timer"){
           return {...each,[name]:value};
        }

          return idx === questionIndex ? { ...each, [name]: value } : each;

      });
      setQuesitons(updatedQuestions);

      setActiveOption(value);

  }

  const onQuesInputChange=(e)=>{
      const {name,value}=e.target
      let arr=name.split(":")
      let optNo=arr[0]
      let type=arr[1]

      const data={
          ...questions[questionIndex].ques,
          [optNo]:{...questions[questionIndex].ques[optNo], [type]:value}
      }
      const updatedQuestions = questions.map((each, idx) => {
          return idx === questionIndex ? { ...each, ques: data } : each;
      });
      setQuesitons(updatedQuestions);
  }

  const addnewOption=()=>{
    // console.log("addnew Optoins",questions);
    let quesObj = questions[questionIndex].ques;

    let newQuestionKey = Object.keys(quesObj).length +1;

      const newQuestion = {
      [newQuestionKey]: {
          [`option${newQuestionKey}`]: "",
          [`imgUrl${newQuestionKey}`]: "",
      },
      };
      
      const updatedQuestion=questions.map((each,idx)=>{
          return idx === questionIndex ? {...each,ques:{...each.ques,...newQuestion}} : each;
      });

      setQuesitons(updatedQuestion);
  }

 

  const removeOption = (delIndex) => {

    console.log("inded",delIndex);
    setQuesitons((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
  
      // Create a copy of the question object in the state without the specified entry
      const updatedQuestion = { ...updatedQuestions[questionIndex] };
      updatedQuestion.ques = { ...updatedQuestion.ques };

  
    let optionsLength = Object.keys(updatedQuestion.ques).length;
    
      if(optionsLength == 4){

        if(delIndex ==2){
        updatedQuestion.ques[3].option3 = updatedQuestion.ques[4].option4;
        updatedQuestion.ques[3].imgUrl3 = updatedQuestion.ques[4].imgUrl4;
        }
        delete updatedQuestion.ques[4];
        
      }else{
        delete updatedQuestion.ques[3];
      }
   
      // Update the questions array with the modified question object
      updatedQuestions[questionIndex] = { ...updatedQuestion };
  
      return updatedQuestions;
    });
  };
  
 const onQuestionCreationCancel = ()=>{

 }


  const onQuestionCreationSubmit = async()=>{

    let questionsArray = [];

    for(let [index,question] of questions.entries()){
        let questionObj = {};

        let optionsArr1 = Object.values(question.ques);

        const formattedOptions = optionsArr1.map((entry,ind) => {
            if(!entry[`option${ind+1}`] && !entry[`imgUrl${ind+1}`]){
                toast.error(`option ${ind+1} is empty at question ${index+1} `, toastOptions);
            }
         return {
            text: entry['option1'] || entry['option2'] || entry['option3'] || entry['option4'],
            image: entry['imgUrl1'] || entry['imgUrl2'] || entry['imgUrl3'] || entry['imgUrl4']
        }
        });
       

        if(!question.pollQuestion.trim()){
            toast.error(`question is empty at question ${index+1} `, toastOptions);
        }
        if(!question.questionType.trim()){
            toast.error(`optionType is empty at question ${index+1} `, toastOptions);
        }
        if(!question.ans.trim() && quizType == "q&a"){
            toast.error(`answer is not available for question ${index+1} `, toastOptions);
        }

        questionObj.questionName = question.pollQuestion;
        questionObj.optionType = question.questionType;
        questionObj.options = [...formattedOptions];
      
        questionObj.answer = formattedOptions[+(question.ans)-1];

        questionsArray.push(questionObj);
    }

    let req = {
            "quizName":quizName,
            "quizType": quizType,
            "timer": +(questions[0].timer),
            "questionDetails":[...questionsArray],
            "userId": localStorageUserDetails.userDetails._id

            };

    // console.log("dafas",req);

    const response  = await fetch(createQuiz, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorageUserDetails.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

        let data = await response.json();

        if(data.msg){
            alert(data.msg);
        }else{
            setIsModalOpen(true);
        }
    console.log("quesitons",data);
  }


  return (
    <div className="createQuestionPage">
        <div className='createQuestionContent'>

            <div className='createQuestionContentQuestionButton'>
                <div className='button-container'>
                    {questions.map((each,index)=>{
                        return (
                            <div key={index} className='questionCircleButton'>
                                <div onClick={()=>setQuestionIndex(index)} className={`questionCircleButton ${questionIndex===index ? "active": ""}`}>{index+1}</div>
                                {questions.length>1 && index > 0 && <div onClick={()=>removeQuestionhandler(index)} className='createQuestionQuestionRemoveButton'>×</div>}
                            </div>
                        )
                    })}

                   {questions.length == 5 ? "": 
                   <div className='plus-button' onClick={()=>addQuestionHander()}>+</div>
                   }
                  
                </div>
                <p>Max 5 questions</p>
            </div>

            <div className='createQuestionContentQuestionNameInput'>
                <input type="text" id = "questionNameInput" name='pollQuestion' 
                value={questions[questionIndex]?.pollQuestion} 
                onChange={onInputChange} placeholder= {placeholderInputQuestion}/>
            </div>

            <div className='createQuestionContentQuestionType'>
                {/* <p>Option Type</p> */}

                <div className="questionTypeText">
                  <p id="questionTypeText">Option Type</p>
                </div>

                <div className='optionType'>
                    <div>
                        <input type="radio" name="questionType" value="text" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'text'}/>
                        <label>Text</label>
                    </div>
                    <div>
                        <input type="radio" id="css" name="questionType" value="image" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'image'}/>
                        <label for="css">Image URL</label>
                    </div>
                    <div>
                        <input type="radio" id="javascript" name="questionType" value="text&image" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'text&image'}/>
                        <label for="javascript">Text & Image URL</label>
                    </div>
                </div>
            </div>

            <div className='createQuestionContentOptionWithTimer'>
            <div className='createQuestionOptions'>
                    {Object.keys(questions[questionIndex]?.ques).map((each,index)=>{
                        return (
                            <div className='createQuestionOption'>
                                <input type="radio" name="ans" value={index+1} onChange={onInputChange} checked={questions[questionIndex]?.ans === (index+1).toString()}/>

                                {(questions[questionIndex]?.questionType==="text&image" || questions[questionIndex]?.questionType==="text") &&
                                <input type="text"
                                onChange={onQuesInputChange}
                                value={questions[questionIndex]?.ques?.[index+1][`option${index+1}`]}
                                name={`${index+1}:option${index+1}`}
                                placeholder={(questions[questionIndex]?.questionType==="text" || questions[questionIndex]?.questionType==="text&image")  ? 'Text':"Image Url"} 
                                className={`radio-buttonOption ${questions[questionIndex]?.ans === (index+1).toString() ?"active":""}  `} />}

                                {(questions[questionIndex]?.questionType==="text&image" || questions[questionIndex]?.questionType==="image") &&
                                <input type="text" 
                                onChange={onQuesInputChange}  
                                value={questions[questionIndex]?.ques?.[index+1][`imgUrl${index+1}`]}
                                name={`${index+1}:imgUrl${index+1}`}
                                placeholder="Image Url"
                                className={`radio-buttonOption ${questions[questionIndex]?.ans === (index+1).toString() ?"active":""}  `} />
                                }
                              

                                {index <2 ?"": 
                                <button className='analyticsTableRowDelete' onClick = {()=>removeOption(index)}>
                                    <Delete/>
                                </button>
                                }

                                
                            </div>
                        )
                    }) }
                    
                    {Object.keys(questions[questionIndex]?.ques).length<4 &&
                    <div >
                       <button onClick={()=>addnewOption()} className='createQuestionAddOption'>Add Option</button>
                    </div>}
                
                </div>
                <div className='createQuestionTimer' style={{display:timerDisplay}}>
                    <p>Timer</p>
                    <div className='questionTimer'>
                        <div 
                        onClick={(e)=>{
                            e.target={name:"timer",value:"0"}
                            onInputChange(e)
                        }}
                        className={`radio-buttonTimerOption ${questions[questionIndex].timer === '0' ? 'active' : ''}`}
                        >Off</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"timer",value:"5"}
                             onInputChange(e);
                             }}
                       
                        className={`radio-buttonTimerOption ${questions[questionIndex].timer === '5' ? 'active' : ''}`}>
                        5 sec</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"timer",value:"10"}
                             onInputChange(e)
                        }}
                        className={`radio-buttonTimerOption ${activeOption === '10' ? 'active' : ''}`}>
                        10 sec</div>

                    </div>
                </div>
            </div> 
           
        <div className="createQuestionContentSubmitCancel">
            
            <button id="createQuestionContentCancelBtn" onClick={onQuestionCreationCancel}>Cancel</button>
            <button id="createQuestionContentSubmitBtn" onClick = {onQuestionCreationSubmit}>Create Quiz</button>

        </div>

        
        {isModalOpen && <LinkShare link = "http://localhost:5000/quiz/getquestions/65b5e4f721ae83bb7629edd8"/>}
        
        </div>
        <ToastContainer />
    </div>
    
  )
}

