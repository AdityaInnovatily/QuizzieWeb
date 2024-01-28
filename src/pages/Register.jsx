
import "./Register.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerRoute} from "../APIRoutes";
import { useNavigate, Link } from "react-router-dom";


export default function Register(){
  
  const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
 
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorageUserDetails) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } 
     else if (name.length < 3) {
      toast.error(
        "username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } 
    // else if (password.length < 8) {
    //   toast.error(
    //     "Password should be equal or greater than 8 characters.",
    //     toastOptions
    //   );
    //   return false;
    // } 
    else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (handleValidation()) {
      const { email, name, password } = values;
     
      const response  = await fetch(registerRoute, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorageUserDetails.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });

        let data = await response.json();

        if(data.msg){
            toast.error(data.msg,toastOptions);
        }else{

          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data)
          );

          toast.error("successfully registered", toastOptions);

          setTimeout(()=>{

            navigate("/login");

          },2000);
         
        }
          
       
    }
  };

    return (<>
      <div className="registrationPage">
        <div className="registrationFormPage">

        <div className="header">
          <h1 id= "header">Registration</h1>
        </div>
        
        <div className="logIn_SignUpOption">
          <button id = "signUpOption" onClick={()=>{navigate("/register")}}>Sign Up</button>
           <button id = "logInOption" onClick={()=>{navigate("/login")}}>Log In</button>
         
        </div>

        <div className="registrationFormContent">

        <div className = "registrationName">
          <p id = "registrationNameText">Name</p>
         <input 
         id= "registrationNameInput" 
         name = "name" 
         onChange={(e) => handleChange(e)}></input> 
        </div>
        <div className = "registrationEmail">
          <p id = "registrationEmailText">Email</p>
         <input 
         id= "registrationEmailInput" 
         name = "email"  
         onChange={(e) => handleChange(e)}></input> 
        </div>

        <div className = "registrationPassword">
          <p id = "registrationPasswordText">Password</p>
           <input 
           id= "registrationPasswordInput" 
           name = "password"  
           onChange={(e) => handleChange(e)}></input>
         </div>

        <div className = "registrationConfirmPassword">
          <p id = "registrationConfirmPasswordText">Confirm Password</p>
          <input 
          id= "registrationConfirmPasswordInput" 
          name = "confirmPassword"  
          onChange={(e) => handleChange(e)}></input> 
          </div>

        </div>
            


      <div className="submitButton">
        <button id = "submitButton" onClick = {handleSubmit}>Sign-Up</button>
      </div>
            
            
    </div>
       
   </div>

        <ToastContainer/>
        </>
    )
    
}