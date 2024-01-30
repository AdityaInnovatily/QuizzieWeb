import "./DeleteBox.css";
import { getQuizList, deleteQuiz, getQuestions } from "../APIRoutes";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";



export default function DeleteBox({quizId}){

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


        //   setQuizList((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
          
        navigate("/analytics");
    }

    return <>
    
     <div className="overlay"></div>
        <div className="deleteBoxComponent">

            <div className="deleteBoxContent">
                <p>Are you confirm you want to delete?</p>

                <div className="createQuestionContentSubmitCancel">

                    <button id="createQuestionContentSubmitBtn" onClick={()=>deleteQuizMethod(quizId)}>Confirm Delete</button> 
                    <button id="createQuestionContentCancelBtn">Cancel</button>
          
                </div>
            </div>
        </div>
    
    </>
}