import "./Dashboard.css";
import Navbar from "../componenents/Navbar";
import { useNavigate } from "react-router-dom";
import DeleteBox from "../componenents/DeleteBox";
import React, { useState, useEffect } from "react";
import { getQuizList ,getQuestions} from "../APIRoutes";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { orange } from "@mui/material/colors";

export default function Dashboard(){


  const localStorageUserDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

  const navigate = useNavigate();
  
  // let total_impressions = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };



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

        const quizListData = await response.json();
        setQuizList(quizListData);

        console.log("dashboard quizList;",quizListData);

        /////fetching question list

        quizListData.map((obj)=>{
          // console.log("obj.impress",obj.impressions);
          setTotalImpressions((prevValue)=> prevValue + obj.impressions);
          const fetchQuestionList = async () => {
            try {
              const responseQuestionList = await fetch(`${getQuestions}/${obj._id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  // Include any additional headers required for your GET request
                },
              });
      
              if (!responseQuestionList.ok) {
                throw new Error('Failed to fetch quiz data');
              }
      
              const dataQuestionList = await responseQuestionList.json();
              // console.log("questinListLenght;", dataQuestionList.length);
              setTotalQuestionsCount((prevValue)=>prevValue + dataQuestionList.length);
             
            
            } catch (error) {
              console.error('Error fetching questionList data:', error.message);
            }
          };
      
          fetchQuestionList();
        })

      
      } catch (error) {
        console.error('Error fetching quiz data:', error.message);
      }
    };

    fetchQuizList();
    
    },[]);


    const getCreatedDateFormat = (date)=>{

      // console.log("dataforem",date);

      const originalDateString = date;
      const originalDate = new Date(originalDateString);
      
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = originalDate.toLocaleDateString("en-US", options);
      
      return formattedDate;

    }

    return <>


        <div className="dashboardPage">
            <Navbar/>
           
            <div className="dashboardContent">
           
           <div className="dashboard_TotalValues">
            
            <div className="dashboard_TotalValues_Quiz"><p>{Math.floor(quizList.length)} Quiz Created</p></div>
            <div className="dashboard_TotalValues_Questions"><p>{Math.floor(totalQuestionsCount/2)} Questions</p></div>
            <div className="dashboard_TotalValues_Impressions" 
            onClick={ 
              openModal}
            ><p>{ (totalImpressions/2)>= 1000 ? `${Math.round(totalImpressions / 200) / 10}k`:totalImpressions/2} Impressions</p></div>

{isModalOpen && <DeleteBox/>}
           
           </div>

           <div className="dashboard_TrendingQuiz">
           
            <p id="dashboard_TrendingQuiz_header">
                Tending Quizes
            </p>
           

<div className="dashboard_quizData_Content">

{quizList.map((item, index) => (
        <div key={index} className="dashboard_quizData">
        <div className="dashboard_quizData_top">
          <p id="dashboard_quizData_quizName">{item.name}</p>
         <div className="dashboard_quizData_impressionsWithIcon"> <p id="dashboard_quizData_impressions">{item.impressions} </p>
         <VisibilityOutlinedIcon style={{color:"#ff4500"}}/>
          </div>
          </div>
          <p id="dashboard_quizData_quizCreatedAt">CreatedOn: {getCreatedDateFormat(item.createdAt)}</p>
        </div>
      ))}
</div>

      </div>

            </div>
           
        </div>
    </>
}