
import "./QuestionAnalysis.css";
import Navbar from "../componenents/Navbar";
import { useLocation } from "react-router-dom";
import { getQuestions } from "../APIRoutes";
import React, { useState, useEffect } from "react";

export default function QuestionAnalysis(){

    const location = useLocation();
    const { state } = location;

    const {quizId,quizName, quizType,quizImpressions,quizCreatedAt} = state;

    const [questionList,setQuestionList] = useState([]);

    let boxes =[
      {text:"people Attempted the question"},
  {text:"people Answered Correctly"},
  {text:"people Answered Incorrectly"}
  ] 

    // console.log("qunnasf",state);
    // if(quizType == "q&a"){

   

    // }else{
    //   boxes =[
    //     {text:"option1"},
    // {text:"option2"},
    // {text:"option3"},
    // {text:"option4"}
    // ] 
    // }

    useEffect(() => {
        // Fetch quiz data from the API
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
            setQuestionList(data);
    
            console.log("questionList",data);
          
          } catch (error) {
            console.error('Error fetching quiz data:', error.message);
          }
        };
    
        fetchQuestionList();
        
        }, []);


//     let questionList = [{
//         id:"1", 
//         quizName:"Quiz 2",
//         question:"Who is the PM of India ?",
//         attempted:2,
//         correctAnswer:1,
//         createdOn:"01/01/2024",
//         impressions:100
//     },{
//         id:"2", 
//         question:"Who is the PM of India ?",
//         attempted:2,
//         correctAnswer:1,
//         createdOn:"01/01/2024",
//         impressions:100
//     },{
//         id:"3", 
//         question:"Who is the PM of India ?",
//         attempted:2,
//         correctAnswer:1,
//         createdOn:"01/01/2024",
//         impressions:100
//     },{
//         id:"4", 
//         question:"Who is the PM of India ?",
//         attempted:2,
//         correctAnswer:1,
//         createdOn:"01/01/2024",
//         impressions:100
//     },{
//         id:"5", 
//         question:"Who is the PM of India ?",
//         attempted:2,
//         correctAnswer:1,
//         createdOn:"01/01/2024",
//         impressions:100
//     },
// ];


    return(
        <>
        <div className="questionAnalysisPage">
            
                <Navbar/> 
            

            <div className="questionAnalysisContent">

            <div className="questionAnalysisHeader">
            <div className="questionAnalysisHeaderLeft">
                    <p  style ={{color:"#3458eb"}}>{quizName} Question Analysis</p>
                </div>

                <div className="questionAnalysisImpressions">

                    <p style ={{color:"#f55c0a"}}>{`Created on: ${quizCreatedAt}`}</p>
                    <p style ={{color:"#f55c0a"}}>{`Impressions: ${quizImpressions}`}</p>
                   
                </div>
            </div>

            <div className="questionAnalysisQuestionsList">
  {questionList.map((obj) => (

    <div key={obj._id} className="questionAnalysisQuestion">
      <p id="questionAnalysisQuestion">{obj.question}</p>

      <div className="questionAnalysisQuestionDetailsBoxes">
        {quizType == "q&a" && boxes.map((box,boxIndex) => (
          <div className="questionAnalysisQuestionDetailsBox">
          
            {boxIndex == 0 ?
            <p>{obj.options.reduce((sum, option) => sum + option.count, 0)}</p>:""
            }

            {boxIndex === 1 &&
            <p>
                {obj.options
                .filter((option) => option.text === obj.answer.text && option.image === obj.answer.image)
                 .map((matchingOption) => matchingOption.count)
                .join(', ')
                }
            </p>
            }

            {boxIndex === 2 &&
            <p>
                {obj.options.reduce((sum, option) => sum + option.count, 0) -
                obj.options
                .filter((option) => option.text === obj.answer.text && option.image === obj.answer.image)
                .map((matchingOption) => matchingOption.count)
                .reduce((sum, count) => sum + count, 0)
                }
            </p>
            }
             <p>{box.text}</p>
          </div>
        ))}


        {quizType == "poll" && boxes.map((box,boxIndex) => (
          <div className="questionAnalysisQuestionDetailsBox">
          
            <p>{obj.options[boxIndex].count}</p>
            
             <p>{obj.options[boxIndex]?.text ? obj.options[boxIndex]?.text : `option${boxIndex+1}`}</p>
          </div>
        ))}




      {/* <p>  {boxes[0].text} </p> */}
      </div>
    </div>
  ))}
</div>


                
            </div>

        </div>
        </>
    )
}