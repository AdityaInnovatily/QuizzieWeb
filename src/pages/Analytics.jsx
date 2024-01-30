import Navbar from "../componenents/Navbar";
import "./Analytics.css";
import { Delete, Share, Edit } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { getQuizList, deleteQuiz, getQuestions } from "../APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DeleteBox from "../componenents/DeleteBox";


export default function Analytics(){

    const localStorageUserDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


    const [quizList,setQuizList] = useState([]);
    const [boxOpen, setBoxOpen] = useState(false);
  

  useEffect(() => {
    // Fetch quiz data from the API
    const fetchQuizList = async () => {
      try {
        const response = await fetch(`${getQuizList}/${localStorageUserDetails.userDetails._id}`, {
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
        setQuizList(data);

        console.log("quizList",data);
      
      } catch (error) {
        console.error('Error fetching quiz data:', error.message);
      }
    };

    fetchQuizList();
    
    }, []);

  
 
    const deleteQuizMethod = async(quizId)=>{
        console.log("quizId to delete",quizId);

        const response  = await fetch(deleteQuiz, {
            method: 'POST',
            headers: {
              // Authorization: `Bearer ${localStorageUserDetails.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             quizId:quizId
            }),
          });


          setQuizList((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
    
    }

    useEffect(()=>{},[deleteQuizMethod])

  

    const quizLinkCopyHandler = (quizId)=>{

        const tempInput = document.createElement('input');
        tempInput.value = `${getQuestions}/${quizId}`;
    
        // Append the input element to the document
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
    
        // Copy the text to the clipboard
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    
        toast.error(`link copied to clipboard`, toastOptions);

        // setTimeout(() => {
        //     navigate("/");
        //   }, 1000);
    }

    const getQuestionWiseAnalysis = ((quiz)=>{

      const originalDateString = quiz.createdAt;
      const originalDate = new Date(originalDateString);
      
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = originalDate.toLocaleDateString("en-US", options);
      
      // console.log(formattedDate); // Output: "28 Jan, 2024"
      console.log("quizTypep",quiz);
      navigate("/questionAnalysis", {state: {
        quizId: quiz._id,
        quizName: quiz.name,
        quizType:quiz.quizType,
        quizImpressions: quiz.impressions,
        quizCreatedAt: formattedDate,
      },});
    })


    return <>
 
    <div className="analyticsPage">
    <Navbar/>
    <div className="analyticsContent">
        <div className="analyticsHeader">
            <p id= "analyticsHeader">Quiz Analysis</p>
        </div>

        <div className="analyticsTable">
          
        <table className="table_main">
      <thead>
        <tr>
          <th>ID</th>
          <th>Quiz Name</th>
          <th>Created At</th>
          <th>Impression</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {quizList.map((quiz) => (
          <tr key={quiz._id}>
            <td>{quiz._id}</td>
            <td>{quiz.name}</td>
            <td>{quiz.createdAt}</td>
            <td>{quiz.impressions}</td>
            
            <div className="analyticsTableRowIcons">

            <button className="analyticsTableRowEdit" 
            onClick = {()=>{navigate("/createQuiz",
            {state:{
              editQuizId:quiz._id,
              editQuizName:quiz.name,
              editQuizType:quiz.quizType
              }
            })
            }}>
            <Edit/>
            </button>

            <button className="analyticsTableRowDelete" onClick={()=>
            {  
              //  setBoxOpen(true)
            deleteQuizMethod(quiz._id)
            }
            }>
            <Delete/>
            </button>

            {/* {boxOpen && <DeleteBox quizId = {quiz._id}/>} */}
            
            <button className="analyticsTableRowShare" onClick={()=>quizLinkCopyHandler(quiz._id)}>
            <Share/>
            </button>

            
            </div>
           
          
            <td id = {quiz._id} style = {{color:"#3458eb"}} onClick = {()=>getQuestionWiseAnalysis(quiz)}>Question Wise Analysis</td>
          </tr>
        ))}
      </tbody>
    </table>


        </div>

    </div>
    <ToastContainer/>
</div>
</>
}