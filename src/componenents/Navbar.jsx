import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar(){

    const navigate = useNavigate();

    return <>
    <div className = "navbarPage">

    <div className="navbarHeader">
    <p id= "header">QUIZZIE</p>
    </div>

<div className="navbarSidebar">
  <button id = "dashboard" onClick = {()=>{navigate("/")}}>Dashboard</button>
  <button id = "analytics" onClick = {()=>{navigate("/analytics")}}>Analytics</button>
  <button id = "createQuiz" onClick = {()=>{navigate("/createQuiz")}}>Create Quiz</button>
</div>


<div className="navbarLogOut">
    <hr/>
    <p id= "logOutBtn">LOGOUT</p>
    </div>

</div>

    </>
}