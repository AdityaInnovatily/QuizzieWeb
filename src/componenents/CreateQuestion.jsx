
import CreateQuiz from "../pages/CreateQuiz";
import "./CreateQuestion.css";

export default function CreateQuestion(){

    return <>
        <div className="createQuestionPage">

        <p>Hello this is question page</p>
        <CreateQuiz 
        inputName ={"Q&A name"} 
        optionType = {"OptionType"}
        options = 
        {[
            {optionName:"text",optionString:"Text"},
            {optionName:"imageUrl",optionString:"Image URL"},
            {optionName:"text_imageUrl",optionString:"Text & Image URL"}
        ]} 

        />

        </div>
    </>

}