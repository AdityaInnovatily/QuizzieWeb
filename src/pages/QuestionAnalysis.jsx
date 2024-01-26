
import "./QuestionAnalysis.css";
import Navbar from "../componenents/Navbar";

export default function QuestionAnalysis({boxes =[
    {text:"people Attempted the question"},
{text:"people Answered Correctly"},
{text:"people Answered Incorrectly"}
] }){

    let data = [{
        id:"1", 
        quizName:"Quiz 2",
        question:"Who is the PM of India ?",
        attempted:2,
        correctAnswer:1,
        createdOn:"01/01/2024",
        impressions:100
    },{
        id:"2", 
        question:"Who is the PM of India ?",
        attempted:2,
        correctAnswer:1,
        createdOn:"01/01/2024",
        impressions:100
    },{
        id:"3", 
        question:"Who is the PM of India ?",
        attempted:2,
        correctAnswer:1,
        createdOn:"01/01/2024",
        impressions:100
    },{
        id:"4", 
        question:"Who is the PM of India ?",
        attempted:2,
        correctAnswer:1,
        createdOn:"01/01/2024",
        impressions:100
    },{
        id:"5", 
        question:"Who is the PM of India ?",
        attempted:2,
        correctAnswer:1,
        createdOn:"01/01/2024",
        impressions:100
    },
];


    return(
        <>
        <div className="questionAnalysisPage">
            
                <Navbar/> 
            

            <div className="questionAnalysisContent">

            <div className="questionAnalysisHeader">
            <div className="questionAnalysisHeaderLeft">
                    <p>{data[0].quizName} Question Analysis</p>
                </div>

                <div className="questionAnalysisImpressions">

                    <p>{`Created on: ${data[0].createdOn}`}</p>
                    <p>{`Impressions: ${data[0].impressions}`}</p>
                   
                </div>
            </div>

            <div className="questionAnalysisQuestionsList">
  {data.map((obj) => (
    <div key={obj.id} className="questionAnalysisQuestion">
      <p id="questionAnalysisQuestion">{obj.question}</p>

      <div className="questionAnalysisQuestionDetailsBoxes">
        {boxes.map((box) => (
          <div className="questionAnalysisQuestionDetailsBox">
            <p>{obj.attempted}</p>
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