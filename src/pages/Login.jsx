import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../APIRoutes";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      // navigate("/dashboard");
    }
  }, []);

  const handleChange = (event) => {
    // console.log('eee',event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log("va", values);
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
     
      const response  = await fetch(loginRoute, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorageUserDetails.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

        let data = await response.json();

      console.log('data;;',data);
    
      if(data.msg){

        toast.error(
          data.msg,
          toastOptions
        );
      }else{
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data)
        );

        toast.error("Welcome To Quizzie", toastOptions);

        setTimeout(()=>{

          navigate("/");

        },2000);
      }
      
    }
  };

  return (
    <>
      <div className="loginPage">

      <div className="formPage">

<div className="header">
  <h1 id= "header">Login</h1>
</div>

<div className="logIn_SignUpOption">
  
   <button id = "signUpOptionBtn" onClick={()=>{navigate("/register")}}> Sign Up</button>
   <button id = "logInOptionBtn" onClick={()=>{navigate("/login")}}>Log In</button>
         
</div>

<div className="loginFormContent">

  <div className = "email">
    <p id = "emailText">Email</p>
    <input id= "emailInput" name = "email" onChange={(e) => handleChange(e)} ></input> 
  </div>

  <div className = "password">
    <p id = "passwordText">Password</p>
    <input id= "passwordInput" name = "password" onChange={(e) => handleChange(e)} ></input>
  </div>


</div>

<div className="submitButton">
<button id = "submitButton" onClick={handleSubmit}>LogIn</button>
</div>
    
    
</div>
      </div>

      <ToastContainer />
    
    </>
  );
}

