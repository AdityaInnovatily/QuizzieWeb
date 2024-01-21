
import "./Register.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerRoute} from "../APIRoutes";


export default function Register(){
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  const [values, setValues] = useState({
    firstName:"",
    lastName :"",
    email :"",
    phoneNo :"",
    dateOfBirth :"",
    highestEducation :"",
    resume:"",
    profile:""

  })

  const changeHandler = async (event)=>{

    setValues({...values,[event.target.name]: event.target.value});


  };
  
  const handleValidation = ()=>{

    const {firstName,lastName,email, phoneNo, dateOfBirth, highestEducation,resume,profile} = values;
    console.log("values;;;",values);
    if(!firstName || !lastName || !email || !phoneNo || !dateOfBirth || !highestEducation ){
      toast.error(
        "Please, fill complete details",
        toastOptions
      );

      return false;
    }else{

      return true;
    }
  };


  const submitUser =  async (event)=>{

    event.preventDefault();

    if(handleValidation()){
    const {firstName,lastName,email, phoneNo, dateOfBirth, highestEducation,resume,profile} = values;
    // console.log('submit',registerRoute);

    let formData = new FormData();
      formData.append('file', resume);
      console.log("fpr,a", formData);
  
    const response  = await fetch(registerRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 
      JSON.stringify(
        {
      firstName:firstName,
      lastName:lastName,
      email:email,
      phoneNo:phoneNo,
      dateOfBirth:dateOfBirth,
      highestEducation:highestEducation,
      resume:formData,
      profile:profile
    }


    ),
    });

      let data = await response.json();
   
    }
  }

    return (<>
      <div className="registrationPage">
        <div className="registrationFormPage">

        <div className="header">
          <h1 id= "header">Registration</h1>
        </div>
        
        <div className="logIn_SignUpOption">
          <button id = "signUpOption">Sign Up</button>
           <button id = "logInOption">Log In</button>
         
        </div>

        <div className="registrationFormContent">

        <div className = "registrationName">
          <p id = "registrationNameText">Name</p>
         <input id= "registrationNameInput" name = "name" ></input> 
        </div>
        <div className = "registrationEmail">
          <p id = "registrationEmailText">Email</p>
         <input id= "registrationEmailInput" name = "email" ></input> 
        </div>

        <div className = "registrationPassword">
          <p id = "registrationPasswordText">Password</p>
           <input id= "registrationPasswordInput" name = "password" ></input>
         </div>

        <div className = "registrationConfirmPassword">
          <p id = "registrationConfirmPasswordText">Confirm Password</p>
          <input id= "registrationConfirmPasswordInput" name = "confirmPassword" onChange = {changeHandler}></input> 
          </div>

        </div>
            


      <div className="submitButton">
        <button id = "submitButton">Sign-Up</button>
      </div>
            
            
    </div>
       
   </div>

        <ToastContainer/>
        </>
    )
    
}