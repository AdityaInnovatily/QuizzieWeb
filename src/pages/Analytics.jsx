import Navbar from "../componenents/Navbar";
import "./Analytics.css";
import { Delete, Share, Edit } from '@mui/icons-material';



export default function Analytics(){

    let data = [
        {
            id:"1",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"2",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"3",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"4",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"5",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"6",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"7",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        {
            id:"8",
            quizName:"quiz1",
            createdAt: "01 jan 2023",
            impression:150
        },
        
    ];


    return <>
 
    <div className="analyticsPage">
    <Navbar/>
    <div className="analyticsContent">
        <div className="analyticsHeader">
            <p id= "analyticsHeader">Quiz Analysis</p>
        </div>

        <div className="analyticsTable">
          
        <table className="table_main">
      <thead>
        <tr>
          <th>ID</th>
          <th>Quiz Name</th>
          <th>Created At</th>
          <th>Impression</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((quiz) => (
          <tr key={quiz.id}>
            <td>{quiz.id}</td>
            <td>{quiz.quizName}</td>
            <td>{quiz.createdAt}</td>
            <td>{quiz.impression}</td>
            
            <div className="analyticsTableRowIcons">

            <button className="analyticsTableRowEdit">
            <Edit/>
            </button>

            <button className="analyticsTableRowDelete">
            <Delete/>
            </button>

            <button className="analyticsTableRowShare">
            <Share/>
            </button>

            </div>
        
          
            <td id = {quiz.id}>Question Wise Analysis</td>
          </tr>
        ))}
      </tbody>
    </table>


        </div>

    </div>
</div>
</>
}