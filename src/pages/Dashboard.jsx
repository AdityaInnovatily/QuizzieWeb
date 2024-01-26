import "./Dashboard.css";
import Navbar from "../componenents/Navbar";
import { useNavigate } from "react-router-dom";
import DeleteBox from "../componenents/DeleteBox";
import React, { useState, useEffect } from "react";

export default function Dashboard(){

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

    const data = [
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 },
        { name: "Quiz1", value: 4 },
        { name: "Quiz2", value: 30 },
        { name: "Quiz3", value: 587 }
      ];

    return <>


        <div className="dashboardPage">
            <Navbar/>
           
            <div className="dashboardContent">
           
           <div className="dashboard_TotalValues">
            
            <div className="dashboard_TotalValues_Quiz">Quiz</div>
            <div className="dashboard_TotalValues_Questions">Questions</div>
            <div className="dashboard_TotalValues_Impressions" onClick={ 
              openModal}
            >Impressions</div>

{isModalOpen && <DeleteBox/>}
           
           </div>

           <div className="dashboard_TrendingQuiz">
           
            <p id="dashboard_TrendingQuiz_header">
                Tending Quizes
            </p>
           

<div className="dashboard_quizData_Content" >

{data.map((item, index) => (
        <div key={index} className="dashboard_quizData">
          <p>Name: {item.name}</p>
          <p>Value: {item.value}</p>
        </div>
      ))}
</div>

      </div>

            </div>
           
        </div>
    </>
}