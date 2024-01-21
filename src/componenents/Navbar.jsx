import "./Navbar.css";

export default function Navbar(){


    return <>
    <div className = "navbarPage">

    <div className="navbarHeader">
    <p id= "header">QUIZZIE</p>
    </div>

<div className="navbarSidebar">
  <button id = "dashboard">Dashboard</button>
  <button id = "analytics">Analytics</button>
  <button id = "createQuiz">Create Quiz</button>
</div>


<div className="navbarLogOut">
    <hr/>
    <p id= "logOutBtn">LOGOUT</p>
    </div>

</div>

    </>
}