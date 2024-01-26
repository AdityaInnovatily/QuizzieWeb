import "./DeleteBox.css";

export default function DeleteBox(){

    return <>
    
     <div className="overlay"></div>
        <div className="deleteBoxComponent">

            <div className="deleteBoxContent">
                <p>Are you confirm you want to delete?</p>

                <div className="createQuestionContentSubmitCancel">

                    <button id="createQuestionContentSubmitBtn">Confirm Delete</button> 
                    <button id="createQuestionContentCancelBtn">Cancel</button>
          
                </div>
            </div>
        </div>
    
    </>
}