import React, { useState } from 'react'
import './CreateQuestion.css';

const CreateQuestion = () => {
    const [questionIndex,setQuestionIndex]=useState(0)
    
    const initialState={
        pollQuestion:"",
        questionType:"text",
        timer:"off",
        ans:"2",
        ques:{
            '1':{option1:"", imgUrl1:""},
            '2':{option2:"", imgUrl2:""},
            '3':{option3:"", imgUrl3:""},
        }
    }

    const [questions,setQuesitons]=useState([initialState])

    const addQuestionHander=()=>{
        if(questions.length<=4){
            setQuesitons(prev=>([...prev,initialState]))
        }
        setQuestionIndex(prev=>prev+1)
    }

    const removeQuestionhandler=(index)=>{
        const newQuestion= questions.filter((each,idx)=>idx!==index)
        setQuesitons(newQuestion)
        setQuestionIndex(prev=>prev-1)
    }

    const onInputChange=(e)=>{
        const {name,value}=e.target
        const updatedQuestions = questions.map((each, idx) => {
            return idx === questionIndex ? { ...each, [name]: value } : each;
        });
        setQuesitons(updatedQuestions)
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
        setQuesitons(updatedQuestions)
    }

    const addnewOption=()=>{
        const newQuestionKey = '4'; 

        const newQuestion = {
        [newQuestionKey]: {
            [`option${newQuestionKey}`]: "",
            [`imgUrl${newQuestionKey}`]: "",
        },
        };
        
        const updatedQuestion=questions.map((each,idx)=>{
            return idx === questionIndex ? {...each,ques:{...each.ques,4:newQuestion}} : each;
        })
        setQuesitons(updatedQuestion)
    }
  
  return (
    <div className='h-[100vh] text-lg font-[500] text-gray-600 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='flex flex-col gap-6 border w-[700px] rounded-xl py-12  bg-white'>

            <div className='flex justify-between items-center px-20'>
                <div className='flex gap-4'>
                    {questions.map((each,index)=>{
                        return (
                            <div key={index} className='relative'>
                                <div onClick={()=>setQuestionIndex(index)} className={`w-12 h-12  rounded-full flex justify-center items-center shad  ${questionIndex===index ? "bg-green-500 text-white hover:bg-green-600": "hover:bg-slate-50"}`}>{index+1}</div>
                                {questions.length>1 && <div onClick={()=>removeQuestionhandler(index)} className='text-2xl absolute top-[-10px] right-0 cursor-pointer'>×</div>}
                            </div>
                        )
                    })}
                   
                    <div className='text-4xl cursor-pointer' onClick={()=>addQuestionHander()}>+</div>
                </div>
                <p>Max 5 question</p>
            </div>

            <div className='border-gray-700  px-20'>
                <input type="text" name='pollQuestion' value={questions[questionIndex]?.pollQuestion} onChange={onInputChange} placeholder='Poll Question' className='rounded-lg shad py-2 px-4 w-full'/>
            </div>

            <div className='flex justify-between border-gray-700 px-24'>
                <p>Option Type</p>
                <div className='flex gap-5'>
                    <div className='flex gap-1'>
                        <input type="radio" id="html" name="questionType" value="text" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'text'}/>
                        <label for="html">Text</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="css" name="questionType" value="image" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'image'}/>
                        <label for="css">Image URL</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="javascript" name="questionType" value="text&image" onChange={onInputChange} checked={questions[questionIndex]?.questionType === 'text&image'}/>
                        <label for="javascript">Text & Image URL</label>
                    </div>
                </div>
            </div>

            <div className='flex justify-between gap-10 items-end px-[50px]'>
                <div className='flex flex-col gap-2'>
                    {Object.keys(questions[questionIndex]?.ques).map((each,index)=>{
                        return (
                            <div className='flex gap-4 border'>
                                <input type="radio"  name="ans" value={index+1} onChange={onInputChange} checked={questions[questionIndex]?.ans === (index+1).toString()}/>

                                {(questions[questionIndex]?.questionType==="text&image" || questions[questionIndex]?.questionType==="text") &&
                                <input type="text" 
                                onChange={onQuesInputChange}  
                                value={questions[questionIndex]?.ques?.[index+1][`option${index+1}`]}
                                name={`${index+1}:option${index+1}`}
                                placeholder={(questions[questionIndex]?.questionType==="text" || questions[questionIndex]?.questionType==="text&image")  ? 'Text':"Image Url"} 
                                className={`rounded-lg shad py-2 px-4 w-[80%] ${questions[questionIndex]?.ans === (index+1).toString() ?"bg-green-500 text-white placeholder-gray-100":""}  `} />}

                                {(questions[questionIndex]?.questionType==="text&image" || questions[questionIndex]?.questionType==="image") &&
                                <input type="text" 
                                onChange={onQuesInputChange}  
                                value={questions[questionIndex]?.ques?.[index+1][`imgUrl${index+1}`]}
                                name={`${index+1}:imgUrl${index+1}`}
                                placeholder="Image Url"
                                className={`rounded-lg shad py-2 px-4 w-[80%] ${questions[questionIndex]?.ans === (index+1).toString() ?"bg-green-500 text-white placeholder-gray-100":""}  `} />
                                }
                                <div className={index>1 ? "block":"invisible"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="40" viewBox="0 0 30 30">
                                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" fill="red" ></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    }) }
                    
                    {Object.keys(questions[questionIndex]?.ques).length<4 &&
                    <div className='flex gap-4 ml-[29px] w-[77%]'>
                       <button onClick={()=>addnewOption()} className='shad w-full py-2 flex justify-center items-center rounded-lg text-lg hover:bg-slate-50'>Add Option</button>
                    </div>}
                
                </div>
                <div className='flex flex-col gap-2 items-center mr-6'>
                    <p>Timer</p>
                    <div className='flex flex-col gap-3'>
                        <div 
                        onClick={(e)=>{
                            e.target={name:"timer",value:"off"}
                            onInputChange(e)
                        }}
                        className={`shad w-[80px] py-1 flex justify-center items-center rounded-lg text-base ${questions[questionIndex]?.timer==="off" ? "bg-red-500 text-white":"bg-white" }`}>Off</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"timer",value:"5"}
                             onInputChange(e)
                        }}
                         className={`shad w-[80px] py-1 flex justify-center items-center rounded-lg text-base ${questions[questionIndex]?.timer==="5" ? "bg-red-500 text-white":"bg-white" }`}>5 sec</div>

                        <div
                        onClick={(e)=>{
                            e.target={name:"timer",value:"10"}
                             onInputChange(e)
                        }}
                         className={`shad w-[80px] py-1 flex justify-center items-center rounded-lg text-base ${questions[questionIndex]?.timer==="10" ? "bg-red-500 text-white":"bg-white" }`}>10 sec</div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between mt-4 px-20'>
               <button className='shad w-[45%] py-1 flex justify-center items-center rounded-lg hover:bg-slate-50'>Cancel</button>
               <button className='shad w-[45%] py-1 flex justify-center items-center rounded-lg bg-green-500 text-white hover:bg-green-600'>Create Quiz</button>
            </div>
        </div>
    </div>
  )
}

export default CreateQuestion