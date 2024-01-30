import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";

export default function Navbar(){

    const navigate = useNavigate();

    useEffect(() => {
      const checkLoginStatus = async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        }
      };
  
      checkLoginStatus();
    }, [navigate]);
    
    const handleClick = async () => {
      console.log('clicked');
     
      let localStorageKey = process.env.REACT_APP_LOCALHOST_KEY;
      localStorage.removeItem(localStorageKey);
    
      navigate("/login");
     
    };
    
    return <>
    <div className = "navbarPage">

    <div className="navbarHeader">
    <p id= "header">QUIZZIE</p>
    </div>

<div className="navbarSidebar">
  <button id = "dashboard" onClick = {()=>{navigate("/")}}>Dashboard</button>
  <button id = "analytics" onClick = {()=>{navigate("/analytics")}}>Analytics</button>
  <button id = "createQuiz" onClick = {()=>{navigate("/createQuiz",{state:{
              editQuizId:"",
              editQuizName:"",
              editQuizType:""
              }
            })}}>Create Quiz</button>
</div>


<div className="navbarLogOut">
    <hr/>
    <p id= "logOutBtn" onClick={handleClick}>LOGOUT</p>
    </div>

</div>

    </>
}