import React, { useEffect, useState } from 'react'
import './CreateQuestion.css';
import { Delete } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { createQuiz,host, updateQuiz, getQuestions } from "../APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LinkShare from './LinkShare';


export default function CreateQuestion({quizId, quizName, quizType, placeholderInputQuestion, timerDisplay}){

    const localStorageUserDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

    console.log("createQuestionPage;;",quizId, quizName);
    
    const navigate = useNavigate();
    
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      useEffect(() => {
        const checkLoginStatus = async () => {
          if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
          }
        };
    
        checkLoginStatus();
      }, [navigate]);

      useEffect(()=>{

            const fetchQuestionList = async () => {
                try {
                  const response = await fetch(`${getQuestions}/${quizId}`, {
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
                //   setQuestionList(data);
                setQuesitons(data);
          
                  console.log("questionListzzzzzzzzz",data);
                
                } catch (error) {
                  console.error('Error fetching quiz data:', error.message);
                }
              };

              if(quizId){
          
                    fetchQuestionList();
                }

      },[])
    

  const [questionIndex,setQuestionIndex]=useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizIdAfterCreation, getQuizIdAfterCreation] = useState("");
 
  const initialState={
      question:"",
      optionType:"text",
      time:"0",
      answer:{text:process.env.REACT_APP_UNIQUE_KEY_FOR_ANS, image:""},
      options:[{text:"", image:""},{text:"", image:""}]
      
        }

  const [questions,setQuesitons]=useState([initialState]);

  const [activeOption, setActiveOption] = useState('0');


  const addQuestionHander=()=>{
      if(questions.length<5){
          setQuesitons(prev=>([...prev,initialState]))
      }
      setQuestionIndex(prev=>prev+1);
  }

  const removeQuestionhandler=(index)=>{
      const newQuestion= questions.filter((each,idx)=>idx!==index);
      setQuesitons(newQuestion);
      setQuestionIndex(prev=>prev-1);
  }

  const onInputChange=(e)=>{
      const {name,value}=e.target
    

      const updatedQuestions = questions.map((each, idx) => {
        
        if(name == "time"){
           return {...each,[name]:value};
        }

        if(name == "answer"){

            return idx === questionIndex ?{...each,[name]: each.options[value]}:each;
        }

          return idx === questionIndex ? { ...each, [name]: value } : each;

      });
      setQuesitons(updatedQuestions);

      setActiveOption(value);

  }

  const onQuesInputChange=(e)=>{

      const {name,value}=e.target
      let index = name[name.length-1];
      let field = name.slice(0,name.length-1);

     
        const updatedQuestions = questions.map((each, idx) => {
            if (idx === questionIndex) {
              const updatedOptions = each.options.map((option, optIndex) => {
                return optIndex === parseInt(index)
                  ? { ...option, [field]: value }
                  : option;
              });
        
              return { ...each, options: updatedOptions };
            } else {
              return each;
            }
          });


    setQuesitons(updatedQuestions);

  }



const addnewOption = () => {
    // Clone the current state
    const updatedQuestions = [...questions];
  
    // Create a new option object
    const newOption = { text: "", image: "" };
  
    // Update the options for the current question
    updatedQuestions[questionIndex].options.push(newOption);
  
    // Update the state with the new options
    setQuesitons(updatedQuestions);
  };

 

  const removeOption = (delIndex) => {

    console.log("inded",delIndex);

    const updatedQuestions = questions.map((each, idx) => {
        if (idx === questionIndex) {
          const updatedOptions = each.options.filter((option, optIndex) => {
            return optIndex != parseInt(delIndex)
          });
    
          return { ...each, options: updatedOptions };
        } else {
          return each;
        }
      });

      setQuesitons(updatedQuestions);

  };


  
 const onQuestionCreationCancel = ()=>{

  navigate("/");

 }


  const onQuestionCreationSubmit = async()=>{

        console.log("questissns", questions);
    
        questions.map((question,index)=>{  

            if(!question.question.trim()){
            toast.error(`question is empty at question ${index+1} `, toastOptions);
        }
        if(!question.optionType.trim()){
            toast.error(`optionType is empty at question ${index+1} `, toastOptions);
        }
        if(question?.answer?.text == process.env.REACT_APP_UNIQUE_KEY_FOR_ANS && quizType == "q&a"){
            toast.error(`answer is not available for question ${index+1} `, toastOptions);
        }})
     

    let req = {
            "quizId": quizId,
            "quizName":quizName,
            "quizType": quizType,
            "time": questions[0].time,
            "questionDetails":[...questions],
            "userId": localStorageUserDetails.userDetails._id

            };

    if(quizId){
        const responseUpdateQuiz  = await fetch(updateQuiz, {
            method: 'POST',
            headers: {
              // Authorization: `Bearer ${localStorageUserDetails.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
          });

          let data = await responseUpdateQuiz.json();

       
            setIsModalOpen(true);
    

    }else{

    const responseCreateQuiz  = await fetch(createQuiz, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorageUserDetails.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

      let data = await responseCreateQuiz.json();
      console.log("ddataaaaaaa created;;", data);
      getQuizIdAfterCreation(data._id);
        if(data.msg){
            alert(data.msg);
        }else{
            setIsModalOpen(true);
        }
    }


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
                <input type="text" id = "questionNameInput" name='question' 
                value={questions[questionIndex]?.question} 
                onChange={onInputChange} placeholder= {placeholderInputQuestion}/>
            </div>

            <div className='createQuestionContentQuestionType'>
                {/* <p>Option Type</p> */}

                <div className="questionTypeText">
                  <p id="questionTypeText">Option Type</p>
                </div>

                <div className='optionType'>
                    <div>
                        <input type="radio" name="optionType" value="text" onChange={onInputChange} checked={questions[questionIndex]?.optionType === 'text'}/>
                        <label>Text</label>
                    </div>
                    <div>
                        <input type="radio" id="css" name="optionType" value="image" onChange={onInputChange} checked={questions[questionIndex]?.optionType === 'image'}/>
                        <label for="css">Image URL</label>
                    </div>
                    <div>
                        <input type="radio" id="javascript" name="optionType" value="text&image" onChange={onInputChange} checked={questions[questionIndex]?.optionType === 'text&image'}/>
                        <label for="javascript">Text & Image URL</label>
                    </div>
                </div>
            </div>

            <div className='createQuestionContentOptionWithTimer'>
            <div className='createQuestionOptions'>
                    {questions[questionIndex]?.options.map((each,index)=>{
                        {/* console.log("optionsss",each); */}
                        return (
                            <div className='createQuestionOption'>
                                <input type="radio" name="answer" 
                                value={index} 
                                onChange={onInputChange} 
                                checked={
                                   
                                    JSON.stringify(questions[questionIndex]?.answer) === JSON.stringify(questions[questionIndex].options[index])
                                    }
                                    />

                                {(questions[questionIndex]?.optionType==="text&image" || questions[questionIndex]?.optionType==="text") &&
                                <input type="text"
                                onChange={onQuesInputChange}
                                value={questions[questionIndex]?.options[index].text}
                                name= {`text${index}`}
                                placeholder={(questions[questionIndex]?.optionType==="text" || questions[questionIndex]?.optionType==="text&image")  ? 'Text':"Image Url"} 
                                className={`radio-buttonOption ${JSON.stringify(questions[questionIndex]?.answer) === JSON.stringify(questions[questionIndex]?.options[index]) ? "active":""}`} />}

                                {(questions[questionIndex]?.optionType==="text&image" || questions[questionIndex]?.optionType==="image") &&
                                <input type="text" 
                                onChange={onQuesInputChange}  
                                value={questions[questionIndex]?.options[index].image}
                                name= {`image${index}`}
                                placeholder="Image Url"
                                className={`radio-buttonOption ${JSON.stringify(questions[questionIndex]?.answer) === JSON.stringify(questions[questionIndex]?.options[index]) ? "active":""}`} />
                                }
                              

                                {index <2 ?"": 
                                <button className='analyticsTableRowDelete' onClick = {()=>removeOption(index)}>
                                    <Delete/>
                                </button>
                                }

                                
                            </div>
                        )
                    }) }
                    
                    {questions[questionIndex]?.options.length<4 &&
                    <div >
                       <button onClick={()=>addnewOption()} className='createQuestionAddOption'>Add Option</button>
                    </div>}
                
                </div>
                <div className='createQuestionTimer' style={{display:timerDisplay}}>
                    <p>Timer</p>
                    <div className='questionTimer'>
                        <div 
                        onClick={(e)=>{
                            e.target={name:"time",value:"0"}
                            onInputChange(e)
                        }}
                        className={`radio-buttonTimerOption ${questions[questionIndex].time === '0' ? 'active' : ''}`}
                        >Off</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"time",value:"5"}
                             onInputChange(e);
                             }}
                       
                        className={`radio-buttonTimerOption ${questions[questionIndex].time === '5' ? 'active' : ''}`}>
                        5 sec</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"time",value:"10"}
                             onInputChange(e)
                        }}
                        className={`radio-buttonTimerOption ${questions[questionIndex].time === '10' ? 'active' : ''}`}>
                        10 sec</div>

                    </div>
                </div>
            </div> 
           
        <div className="createQuestionContentSubmitCancel">
            
            <button id="createQuestionContentCancelBtn" onClick={onQuestionCreationCancel}>Cancel</button>
            <button id="createQuestionContentSubmitBtn" onClick = {onQuestionCreationSubmit}>Create Quiz</button>

        </div>

        
        {isModalOpen && <LinkShare link = {`http://localhost:3000/quiz/${quizIdAfterCreation}`}/>}
        
        </div>
        <ToastContainer />
    </div>
    
  )
}

