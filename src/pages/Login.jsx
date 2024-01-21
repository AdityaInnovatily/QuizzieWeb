import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../APIRoutes";
import "./Login.css";

export default function Login() {
  // const navigate = useNavigate();
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
      // navigate("/");
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
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password
      });

      console.log('data;;',data);
    
      if(data.msg == "Incorrect Username or Password"){

        console.log('sfdsf');
        toast.error(
          data.msg,
          toastOptions
        );
      }else if(data.msg == "Incorrect Password"){

        console.log('sfdsf');
        toast.error(
          data.msg,
          toastOptions
        );
      }else{
      console.log('else.',data)
        await localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data)
        );
        
        // navigate("/");
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
  <button id="signUpOptionBtn">Sign Up</button>
   <button id="logInOptionBtn">Log In</button>
 
</div>

<div className="loginFormContent">

  <div className = "email">
    <p id = "emailText">Email</p>
    <input id= "emailInput" name = "email" ></input> 
  </div>

  <div className = "password">
    <p id = "passwordText">Password</p>
    <input id= "passwordInput" name = "password" ></input>
  </div>


</div>

<div className="submitButton">
<button id = "submitButton">LogIn</button>
</div>
    
    
</div>
      </div>

      <ToastContainer />
    
    </>
  );
}

