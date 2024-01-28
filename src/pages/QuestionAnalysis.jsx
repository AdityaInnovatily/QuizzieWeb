
import "./QuestionAnalysis.css";
import Navbar from "../componenents/Navbar";
import { useLocation } from "react-router-dom";
import { getQuestions } from "../APIRoutes";
import React, { useState, useEffect } from "react";

export default function QuestionAnalysis({boxes =[
    {text:"people Attempted the question"},
{text:"people Answered Correctly"},
{text:"people Answered Incorrectly"}
] }){

    const location = useLocation();
    const { state } = location;

    const {quizId} = state;

    const [questionList,setQuestionList] = useState([]);

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
                    <p>{"questionList[0].quizName"} Question Analysis</p>
                </div>

                <div className="questionAnalysisImpressions">

                    <p>{`Created on: ${"questionList[0].createdOn"}`}</p>
                    <p>{`Impressions: ${"questionList[0].impressions"}`}</p>
                   
                </div>
            </div>

            <div className="questionAnalysisQuestionsList">
  {questionList.map((obj) => (

    <div key={obj._id} className="questionAnalysisQuestion">
      <p id="questionAnalysisQuestion">{obj.question}</p>

      <div className="questionAnalysisQuestionDetailsBoxes">
        {boxes.map((box,boxIndex) => (
          <div className="questionAnalysisQuestionDetailsBox">
            {/* <p>{"obj.attempted"}</p> */}
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