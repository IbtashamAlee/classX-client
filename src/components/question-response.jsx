import {useState} from "react";
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import api from "../generic-services/api";
import {useParams} from "react-router-dom";

export default function QuestionResponse({test,k}){
  const [editMode,setEditMode] = useState(false)
  const [marks,setMarks] = useState(test.obtainedScore)
  const {id,assessment_id} = useParams();
  const [key, setKey] = useState(0)
  function updateMarks(response_id){
    if(marks>=0) {
      api.execute(`/api/class/${id}/assessment/${assessment_id}/response/${response_id}/marks`, 'PUT', {
        obtainedScore: marks
      })
        .then(res => {
          setMarks(res.data.obtainedScore)
          setKey(key + 1)
          setEditMode(false)
        })
        .catch(err => console.log(err))
    }
  }
  return(
    <div key={key} className="p-4 w-full min-h-[200px] rounded-2xl shadow mb-2" key={k}>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-semibold">Question {k+1} :</h1>
          <h1 className="ml-2">{test.question.statement}</h1>
        </div>
        <div className="p-3 font-semibold text-slate-600 ">
          <span className="flex flex-row">
            { !editMode &&
              <p className="w-10 text-center rounded-md">{marks} </p>
            }
            { editMode &&
              <input type="number" max={test.question.questionScore} min={0} value={marks} onChange={(e)=>setMarks(e.target.value)}
              className="h-6 w-12 text-center rounded-md border-0 bg-yellow-100"/>
            }
            <p>/</p>
            <p className="w-10 text-center rounded-md">{test.question.questionScore}</p>
            {
              editMode &&
                <UploadIcon onClick={()=>updateMarks(test.id)} />
            }
            {
              !editMode &&
              <EditIcon onClick={()=>setEditMode(!editMode)}/>
            }
          </span>
          {/*<p>{(test.obtainedScore ?? 0) + ' / ' + test.question.questionScore}</p>*/}
        </div>
      </div>
      {test.question.option.length < 1 &&
      <div>
        <h1 className="font-semibold mt-2">Answer:</h1>
        <h1 className="ml-2">{test.answerStatment ?? ''}</h1>
      </div>
      }
      {test.question.option.length < 1 &&
      <div>
        {
          test.responseAttachment.length > 0 &&
          (<div>
            Attached files appear here
          </div>)
        }
        {
          test.responseAttachment.length < 1 &&
          <div className="font-semibold text-red-700 mt-6">
            No files attached
          </div>
        }
      </div>
      }
      {test.question.option.length > 0 &&
      <div>
        <h1 className="font-semibold mt-2">Options:</h1>
        <ul className="flex flex-row justify-start items-center mt-2">
          {
            test.question.option.map(opt => {
              return (
                <li
                  className={(opt.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " px-4 rounded-lg ml-4"}>{opt.value}</li>
              )
            })
          }
        </ul>
      </div>
      }
      {test.question.option.length > 0 &&
      <div>
        <h1 className="font-semibold mt-2">User Selected Options</h1>
        <ul className="flex flex-row justify-start items-center mt-2">
          {test.questionResponseOption.length > 0 &&
          test.questionResponseOption.map(opt => {
            console.log(opt)
            return (
              <li
                className={(opt?.option?.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " px-4 rounded-lg ml-4"}>{opt?.option?.value}</li>
            )
          })
          }
          {
            test.questionResponseOption.length < 1 &&
            <p>No option selected by user </p>
          }
        </ul>
      </div>
      }
    </div>
  )
}