import "./DeleteBox.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import React, {useEffect} from "react";


export default function LinkShare({link}){

    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1500,
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


    const textCopyHandler = ()=>{

        const tempInput = document.createElement('input');
        tempInput.value = link;
    
        // Append the input element to the document
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
    
        // Copy the text to the clipboard
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    
        toast.error(`link copied to clipboard`, toastOptions);

        setTimeout(() => {
            navigate("/");
          }, 1000);
    }

    return <>
    
     <div className="overlay"></div>
        <div className="deleteBoxComponent">

            <div className="deleteBoxContent">
                <p>Congrats your Quiz is Published!</p>

                <p style={{ 
                    width: "80%",
                    height: "50px",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 25px 0 rgba(0,0,0,.15)",
                    backgroundColor:"#fffefa",
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize:"13px",
                    color:"#3458eb"
                }}>{link}</p>


                <div className="createQuestionContentSubmitCancel">

                    <button id="createQuestionContentSubmitBtn" onClick={textCopyHandler}>Copy</button> 
                   
          
                </div>
            </div>
        </div>
    
        <ToastContainer />
    </>
}