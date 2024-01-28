import Navbar from "../componenents/Navbar";
import "./Analytics.css";
import { Delete, Share, Edit } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { getQuizList, deleteQuiz, getQuestions } from "../APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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


    const getQuestionWiseAnalysis = ((quizId)=>{

      navigate("/questionAnalysis", {state:{quizId}});

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

            <button className="analyticsTableRowEdit">
            <Edit/>
            </button>

            <button className="analyticsTableRowDelete" onClick={()=>deleteQuizMethod(quiz._id)}>
            <Delete/>
            </button>

            <button className="analyticsTableRowShare" onClick={()=>quizLinkCopyHandler(quiz._id)}>
            <Share/>
            </button>

            </div>
        
          
            <td id = {quiz._id} onClick = {()=>getQuestionWiseAnalysis(quiz._id)}>Question Wise Analysis</td>
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